# Airbnb Listing Page Clone — Project Plan
**Assignment:** Playpower Labs Take-Home Task
**Reference:** https://airbnb-clone-umber-two.vercel.app
**Scope:** Desktop only. Three views — Listing Page, Photo Tour, Lightbox.

---

## 1. Objective

Reproduce the reference page pixel-for-pixel and behavior-for-behavior, then
submit a production-scale architecture diagram for a vacation-rental
marketplace. The grading rubric weighs four things equally:

1. Modern AI workflow usage (agents, sub-agents, skills, prompts)
2. Visual + behavioral fidelity to the reference (incl. animations, a11y)
3. Production architecture thinking
4. Code quality / project structure via sub-agent configs

---

## 2. Tech Stack Decision

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14/16 (App Router) + TypeScript | Fast static build, easy Vercel deploy, file-based routing suits overlay routes |
| Styling | Tailwind CSS + CSS variables for design tokens | Fastest path to exact spacing/color matching, easy to diff |
| Data | Static local dataset (`/lib/data/listing.ts`) | No backend required per brief; keeps scope tight |
| Icons | `lucide-react` matching Airbnb design system | High-fidelity Airbnb icon set |
| Hosting | Vercel | Free, zero-config for Next.js |
| Diagram tool | Excalidraw + SVG | Free, fast, exports PNG/SVG/Excalidraw cleanly |

---

## 3. Phase Breakdown

### Phase 0 — Recon
- [x] Screen-record a full scroll-through of the reference + both overlays
- [x] Screenshot every section at full resolution
- [x] Open DevTools → note font-family, computed colors (hex), spacing (px),
      border-radius, box-shadow values, transition durations/easing
- [x] List every interactive behavior you observe (see `BEHAVIOR_CHECKLIST.md`)
- [x] Save all reference assets to `/reference/` in the repo (screenshots, notes)

### Phase 1 — Scaffold
- [x] `npx create-next-app@latest` with TypeScript + Tailwind + App Router
- [x] Create skeleton folders: `components/listing`, `components/photo-tour`,
      `components/lightbox`, `lib/data`, `lib/hooks`
- [x] Define design tokens in `tailwind.config.ts` / `globals.css` from recon notes
- [x] Stub out static listing data JSON with photos and detailed specs

### Phase 2 — Listing Page
- [x] Header (logo, nav, user menu) — structure then style
- [x] Photo grid (hero + 4 thumbnails + "Show all photos" button)
- [x] Title block, badges, host summary line
- [x] Amenities section with full categorized modal
- [x] Sticky booking/price card (scroll behavior matched, interactive dates & guest selector)
- [x] Reviews section with category rating bars and cards
- [x] Map / location section with interactive zoom controls & marker
- [x] Footer with 4-column directory and legal bars
- [x] Hover states + micro-interactions across all of the above

### Phase 3 — Photo Tour Overlay
- [x] Route or modal triggered by hero image / "Show all photos"
- [x] Full-screen grid layout matching reference
- [x] Open/close transition matched (duration + easing)
- [x] Close button + ESC to close
- [x] Scroll behavior within overlay (body scroll locked)

### Phase 4 — Lightbox Overlay
- [x] Single-photo view triggered from any gallery photo
- [x] Prev/next arrow controls
- [x] Keyboard ← / → navigation
- [x] Transition between photos matched
- [x] Focus trap + return focus to trigger element on close

### Phase 5 — Accessibility Pass
- [x] Keyboard-only pass through entire page + both overlays
- [x] `aria-label` on all icon-only buttons
- [x] Correct focus order, visible focus rings
- [x] `alt` text on all images
- [x] `prefers-reduced-motion` handling (differentiator implemented)

### Phase 6 — Architecture Diagram
- [x] Draft in Excalidraw: client, CDN, API layer, DB, search (e.g.
      Elasticsearch/OpenSearch), image storage/CDN, caching, deployment/CI-CD, scaling
      strategy notes per layer
- [x] Export as SVG, HTML viewer, and `.excalidraw` format

### Phase 7 — Packaging
- [x] Clean up code, remove dead files/console logs
- [x] Finalize `PROMPT_LOG.md` with actual prompt sequence
- [x] Confirm `.claude/agents/` sub-agent configs are included
- [x] Zip: code + architecture diagram (do NOT push to a public GitHub repo)

---

## 4. Differentiator (optional, low-risk)

Respect `prefers-reduced-motion`: swap matched transitions for instant/
cross-fade equivalents when the user has that OS setting on. One CSS/JS
guard, demonstrates a11y judgment rather than just replication. Do **not**
add new features to the listing page itself (extra filters, wishlist, etc.)
— fidelity is scored, not scope.

---

## 5. Definition of Done

- Every item in `BEHAVIOR_CHECKLIST.md` is checked off
- Side-by-side screenshot diff of your clone vs. reference shows no
  noticeable spacing/color/font drift
- Full keyboard-only navigation works on listing page + both overlays
- Architecture diagram covers frontend, backend, storage, search, deployment
- `.claude/agents/` configs and `PROMPT_LOG.md` are present in the zip
