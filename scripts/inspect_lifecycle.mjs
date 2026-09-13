import { chromium } from "playwright";

async function run() {
  const browser = await chromium.launch({
    args: ['--disable-blink-features=AutomationControlled']
  });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  page.on('console', msg => console.log('REF CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('REF ERROR:', err.message));
  page.on('requestfailed', req => console.log('REF REQ FAILED:', req.url(), req.failure()?.errorText));

  try {
    console.log('Navigating to reference...');
    await page.goto('https://airbnb-clone-umber-two.vercel.app', { waitUntil: 'domcontentloaded', timeout: 30000 });
    console.log('DOMContentLoaded reached. Waiting for text change or timeout...');
    
    for (let i = 0; i < 15; i++) {
      await page.waitForTimeout(1000);
      const text = await page.evaluate(() => document.body.innerText);
      console.log(`Sec ${i+1}: text length = ${text.length}, snippet = "${text.substring(0, 80).replace(/\n/g, ' ')}"`);
      if (!text.includes('Loading...') && text.length > 50) {
        console.log('Page loaded content!');
        break;
      }
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await browser.close();
  }
}

run();
