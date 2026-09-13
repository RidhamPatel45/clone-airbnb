import { chromium } from "playwright";

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

  const offsets = await page.evaluate(() => {
    const getTop = (el) => (el ? Math.round(el.getBoundingClientRect().top + window.scrollY) : null);
    return {
      hero: getTop(document.getElementById("photos")),
      titleHost: getTop(document.querySelector("h1")),
      sleeping: getTop(document.querySelector("h2[class*='Where you']")),
      amenities: getTop(document.getElementById("amenities")),
      calendar: getTop(document.getElementById("calendar")),
      reviews: getTop(document.getElementById("reviews")),
      location: getTop(document.getElementById("location")),
      hostProfile: getTop(document.querySelector("[aria-label='Host information']")),
      similar: getTop(document.querySelector("[aria-label='Similar stays nearby']")),
      pageHeight: document.body.scrollHeight
    };
  });

  console.log("Section Offsets on localhost:3000:", JSON.stringify(offsets, null, 2));
  await browser.close();
}

run();
