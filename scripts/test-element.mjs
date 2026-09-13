import { chromium } from 'playwright';
import fs from 'fs';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

async function test() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 800 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  const el = await page.$('section[aria-label="Similar stays nearby"]');
  if (el) {
    const cloneBuf = await el.screenshot();
    const refBuf = fs.readFileSync('reference/similar-listings-reference.png');

    const imgA = PNG.sync.read(refBuf);
    const imgB = PNG.sync.read(cloneBuf);

    console.log('Ref size:', imgA.width, 'x', imgA.height);
    console.log('Clone element size:', imgB.width, 'x', imgB.height);

    const width = Math.min(imgA.width, imgB.width);
    const height = Math.min(imgA.height, imgB.height);

    const croppedA = new PNG({ width, height });
    const croppedB = new PNG({ width, height });
    PNG.bitblt(imgA, croppedA, 0, 0, width, height, 0, 0);
    PNG.bitblt(imgB, croppedB, 0, 0, width, height, 0, 0);

    const diff = new PNG({ width, height });
    const mismatched = pixelmatch(croppedA.data, croppedB.data, diff.data, width, height, { threshold: 0.1 });
    const pct = ((mismatched / (width * height)) * 100).toFixed(2);
    console.log('Element diff mismatch %:', pct + '%');

    fs.writeFileSync('pixel-diff-output/similar-element-diff.png', PNG.sync.write(diff));
    fs.writeFileSync('pixel-diff-output/similar-element-clone.png', cloneBuf);
  }
  await browser.close();
}

test();
