import { chromium } from "playwright";
import path from "path";

async function convert() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1050 } });
  const htmlPath = "file:///" + path.resolve("architecture-diagram.html").replace(/\\/g, "/");
  await page.goto(htmlPath, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);

  const el = await page.$(".diagram-container");
  if (el) {
    await el.screenshot({ path: "architecture-diagram.png" });
    console.log("Saved architecture-diagram.png");
  } else {
    await page.screenshot({ path: "architecture-diagram.png", fullPage: true });
    console.log("Saved full-page architecture-diagram.png");
  }
  await browser.close();
}

convert();
