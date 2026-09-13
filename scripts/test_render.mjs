import { chromium } from "playwright";
import fs from "fs";

async function run() {
  const browser = await chromium.launch({
    args: ['--disable-blink-features=AutomationControlled']
  });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();
  try {
    console.log('Navigating to reference...');
    await page.goto('https://airbnb-clone-umber-two.vercel.app', { waitUntil: 'networkidle', timeout: 25000 });
    await page.waitForTimeout(2000);
    const refBuf = await page.screenshot({ type: 'png' });
    fs.writeFileSync('scripts/test_ref.png', refBuf);
    console.log('Saved scripts/test_ref.png');

    console.log('Navigating to clone...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 25000 });
    await page.waitForTimeout(2000);
    const cloneBuf = await page.screenshot({ type: 'png' });
    fs.writeFileSync('scripts/test_clone.png', cloneBuf);
    console.log('Saved scripts/test_clone.png');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await browser.close();
  }
}

run();
