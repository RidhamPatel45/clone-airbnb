import { chromium } from "playwright";
import fs from "fs";

async function verify() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 900 } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

  const el = await page.$('section[aria-label="Sleeping arrangements"]');
  if (el) {
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    const buf = await page.screenshot();
    fs.writeFileSync("C:/Users/USER/.gemini/antigravity-ide/brain/aa85d649-fc08-4de0-b918-abcb8755dcc9/where_you_sleep_verification.png", buf);
    console.log("Saved where_you_sleep_verification.png");
  } else {
    console.error("Section not found");
  }
  await browser.close();
}

verify();
