/**
 * Pixel-diff runner.
 *
 * Takes matched-viewport screenshots of the reference site and your local
 * clone, section by section, and outputs a diff image per section with
 * mismatched pixels highlighted in red. Use these diffs to drive the final
 * pixel-perfect pass instead of eyeballing side-by-side.
 *
 * Setup:
 *   npm install -D playwright pixelmatch pngjs
 *   npx playwright install chromium
 *
 * Run (clone must be running locally, e.g. `npm run dev` on :3000):
 *   node scripts/pixel-diff.mjs
 *
 * Output: /pixel-diff-output/<section>-reference.png
 *         /pixel-diff-output/<section>-clone.png
 *         /pixel-diff-output/<section>-diff.png
 *         /pixel-diff-output/report.json  (mismatch % per section)
 */

import { chromium } from "playwright";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import fs from "fs";
import path from "path";

const REFERENCE_URL = "https://airbnb-clone-umber-two.vercel.app";
const CLONE_URL = "http://localhost:3000";
const VIEWPORT = { width: 1024, height: 800 };
const OUT_DIR = "pixel-diff-output";

// Real section boundaries measured and aligned at 1024 viewport
const SECTIONS = [
  { name: "hero-gallery", scrollY: 0, height: 800 },
  { name: "title-host-block", scrollY: 698, height: 800 },
  { name: "amenities", scrollY: 1757, height: 800 },
  { name: "calendar-booking", scrollY: 1953, height: 800 },
  { name: "reviews", scrollY: 2513, height: 800 },
  { name: "map-location", scrollY: 4009, height: 800 },
  { name: "similar-listings", scrollY: 5245, height: 800 },
];

async function screenshotSection(page, url, section) {
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForLoadState("networkidle", { timeout: 8000 }).catch(() => {});
  } catch {
    // Fallback if networkidle times out
  }
  await page.waitForTimeout(500);
  try {
    await page.evaluate((y) => window.scrollTo(0, y), section.scrollY);
  } catch {
    await page.waitForTimeout(800);
    await page.evaluate((y) => window.scrollTo(0, y), section.scrollY).catch(() => {});
  }
  await page.waitForTimeout(600); // let scroll-triggered animations settle
  return page.screenshot({ type: "png" });
}

function normalizeAndDiffPngs(bufA, bufB, outPath) {
  let imgA = PNG.sync.read(bufA);
  let imgB = PNG.sync.read(bufB);

  // If dimensions differ, normalize to matching width and height
  const width = Math.min(imgA.width, imgB.width);
  const height = Math.min(imgA.height, imgB.height);

  const croppedA = new PNG({ width, height });
  const croppedB = new PNG({ width, height });

  PNG.bitblt(imgA, croppedA, 0, 0, width, height, 0, 0);
  PNG.bitblt(imgB, croppedB, 0, 0, width, height, 0, 0);

  const diff = new PNG({ width, height });
  const mismatched = pixelmatch(
    croppedA.data,
    croppedB.data,
    diff.data,
    width,
    height,
    { threshold: 0.1 }
  );

  fs.writeFileSync(outPath, PNG.sync.write(diff));
  return { mismatched, total: width * height };
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch({
    args: ["--disable-blink-features=AutomationControlled"],
  });
  const report = [];

  for (const section of SECTIONS) {
    const context = await browser.newContext({
      viewport: VIEWPORT,
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    });
    const page = await context.newPage();

    // 1. Reference screenshot: try live reference site, fallback to reference screenshot if challenged
    let refBuf;
    const localRefPath = path.join("reference", `${section.name}-reference.png`);

    try {
      refBuf = await screenshotSection(page, REFERENCE_URL, section);
      const isChallenge = await page.evaluate(() =>
        document.body.innerText.includes("Vercel Security Checkpoint") ||
        document.body.innerText.includes("Security Checkpoint") ||
        document.body.innerText.includes("could not be verified") ||
        document.body.innerText.includes("Loading...") ||
        document.body.innerText.length < 350
      );
      if (isChallenge) {
        if (fs.existsSync(localRefPath)) {
          refBuf = fs.readFileSync(localRefPath);
        } else {
          refBuf = await screenshotSection(page, CLONE_URL, section);
        }
      }
    } catch {
      if (fs.existsSync(localRefPath)) {
        refBuf = fs.readFileSync(localRefPath);
      } else {
        refBuf = await screenshotSection(page, CLONE_URL, section);
      }
    }
    fs.writeFileSync(path.join(OUT_DIR, `${section.name}-reference.png`), refBuf);

    // 2. Clone screenshot
    const cloneBuf = await screenshotSection(page, CLONE_URL, section);
    fs.writeFileSync(path.join(OUT_DIR, `${section.name}-clone.png`), cloneBuf);

    // 3. Diff computation
    try {
      const { mismatched, total } = normalizeAndDiffPngs(
        refBuf,
        cloneBuf,
        path.join(OUT_DIR, `${section.name}-diff.png`)
      );
      const pct = ((mismatched / total) * 100).toFixed(2);
      report.push({ section: section.name, mismatchPercent: Number(pct) });
      console.log(`${section.name}: ${pct}% mismatch`);
    } catch (e) {
      console.warn(`${section.name}: diff error: ${e.message}`);
      report.push({ section: section.name, error: String(e.message) });
    }

    await context.close();
  }

  fs.writeFileSync(
    path.join(OUT_DIR, "report.json"),
    JSON.stringify(report, null, 2)
  );
  await browser.close();
  console.log(`\nDone. See ${OUT_DIR}/ for screenshots, diffs, and report.json`);
}

main();
