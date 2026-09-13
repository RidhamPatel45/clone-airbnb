# Final Pixel-Perfect QA Pass

Use this once the site "looks basically done." Don't rely on eyeballing —
generate objective diffs, then hand the agent the specific deltas.

---

## Step 1 — Run the automated diff

```
npm install -D playwright pixelmatch pngjs
npx playwright install chromium
npm run dev            # start your clone on localhost:3000, separate terminal
node scripts/pixel-diff.mjs
```

Before running: open `scripts/pixel-diff.mjs` and adjust the `SECTIONS`
array's `scrollY` values to match your actual page's section boundaries
(the placeholder values are guesses). This screenshots the reference and
your clone at matching scroll positions and viewport, and writes a
`*-diff.png` per section with mismatched pixels highlighted in red, plus a
`report.json` with a mismatch percentage per section.

Note: if `pixelmatch` throws a dimension-mismatch error for a section,
your clone's layout height differs from the reference at that scroll
point — that's itself a finding (something is taller/shorter than it
should be), inspect the two screenshots side by side.

## Step 2 — Feed the results to your agent

Look at `report.json` first — sort sections by mismatch % descending and
tackle the worst offenders first. Open the corresponding `-diff.png` for
each to see *where* the mismatch is (top strip = spacing issue, whole
region tinted = color/font issue, edges only = alignment/sizing issue).

### Ready-to-paste prompt

```
I ran a pixel-diff comparison between the reference site and our clone.
Here are the results (attach report.json and the relevant -diff.png /
-reference.png / -clone.png files for the worst-mismatched sections).

For each section below:
1. Look at the reference and clone screenshots side by side, and the diff
   overlay showing exactly which pixels differ.
2. Identify the specific cause: spacing/padding, font-size/weight/family,
   color, border-radius, image aspect ratio/crop, or element alignment.
3. Fix only that section's code — do not touch sections that are already
   below 1% mismatch.
4. After the fix, tell me what changed (property + before/after value) so
   I can note it in BEHAVIOR_CHECKLIST.md.

Section: [name from report.json]
Mismatch: [X]%
[attach reference / clone / diff images]

Do not guess at fixes without looking at the diff image — the highlighted
region tells you exactly where to look, use it instead of restyling the
whole section.
```

Repeat section by section until every section is under your target
threshold (2–3% mismatch is a reasonable bar for "pixel-perfect" given
font-rendering/anti-aliasing noise between browsers — 0% is not a
realistic target and chasing it wastes time on font-rasterization noise
rather than real defects).

## Step 3 — Re-run after fixes

Re-run `node scripts/pixel-diff.mjs` after each batch of fixes to confirm
the mismatch percentage actually dropped, not just that it looks better to
your eye. Update `report.json`'s numbers in your notes as you go so you
have before/after evidence if asked about your process.

## Step 4 — Manual pass for what screenshots can't catch

Diffing only catches static visual state. Manually re-verify against
`BEHAVIOR_CHECKLIST.md`:
- Hover states (diff tool doesn't trigger `:hover`)
- Animation timing/easing (diff tool only sees static frames)
- Keyboard navigation and focus order
- Photo Tour and Lightbox overlays (add extra `SECTIONS` entries for these
  if you want them diffed too — trigger the overlay via
  `page.click(...)` before screenshotting)

## Step 5 — Sign-off

Before packaging, confirm:
- [ ] Every section in `report.json` is at or below your target mismatch %
- [ ] Every row in `BEHAVIOR_CHECKLIST.md` is checked
- [ ] `pixel-diff-output/` is either removed from the final zip or kept as
      evidence of your QA process (optional — could strengthen your
      submission by showing the rigor of your workflow)
