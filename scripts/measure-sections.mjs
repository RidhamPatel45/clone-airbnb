import { chromium } from "playwright";

async function measure() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 800 } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

  const result = await page.evaluate(() => {
    const list = [];
    const elements = document.querySelectorAll("section, main > div, #reviews, #location, #amenities");
    for (const el of elements) {
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const aria = el.getAttribute("aria-label") || "";
      const id = el.id || "";
      const tag = el.tagName.toLowerCase();
      const h2 = el.querySelector("h2, h3")?.innerText || "";
      list.push({ tag, id, aria, h2: h2.substring(0, 40), top: Math.round(top), height: Math.round(rect.height) });
    }
    return list;
  });

  const alignments = await page.evaluate(() => {
    const similarEl = document.querySelector('section[aria-label*="similar" i]');
    const similarH2 = similarEl?.querySelector("h2");

    const reviewsEl = document.getElementById("reviews");
    const reviewsRating = reviewsEl?.querySelector("span.text-\\[72px\\]");

    const calEl = document.getElementById("calendar");
    const calH2 = calEl?.querySelector("h2");

    return {
      similarH2Top: similarH2 ? similarH2.getBoundingClientRect().top + window.scrollY : 0,
      reviewsRatingTop: reviewsRating ? reviewsRating.getBoundingClientRect().top + window.scrollY : 0,
      calH2Top: calH2 ? calH2.getBoundingClientRect().top + window.scrollY : 0,
    };
  });

  console.log("Alignments:", alignments);
  await browser.close();
}

measure();
