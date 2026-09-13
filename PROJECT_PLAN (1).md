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
| Framework | Next.js 14 (App Router) + TypeScript | Fast static build, easy Vercel deploy, file-based routing suits overlay routes |
| Styling | Tailwind CSS + CSS variables for design tokens | Fastest path to exact spacing/color matching, easy to diff |
| Data | Static local JSON (`/lib/data/listing.json`) | No backend required per brief; keeps scope tight |
| Icons | `lucide-react` or hand-copied SVGs matching reference | Must visually match reference icon set |
| Hosting | Vercel | Free, zero-config for Next.js |
| Diagram tool | Excalidraw | Free, fast, exports PNG/SVG cleanly |

---

## 3. Phase Breakdown

### Phase 0 — Recon (do this yourself, not the agent)
- [ ] Screen-record a full scroll-through of the reference + both overlays
- [ ] Screenshot every section at full resolution
- [ ] Open DevTools → note font-family, computed colors (hex), spacing (px),
      border-radius, box-shadow values, transition durations/easing
- [ ] List every interactive behavior you observe (see `BEHAVIOR_CHECKLIST.md`)
- [ ] Save all reference assets to `/reference/` in the repo (screenshots, notes)

### Phase 1 — Scaffold
- [ ] `npx create-next-app@latest` with TypeScript + Tailwind + App Router
- [ ] Create skeleton folders: `components/listing`, `components/photo-tour`,
      `components/lightbox`, `lib/data`, `lib/hooks`
- [ ] Define design tokens in `tailwind.config.ts` / `globals.css` from recon notes
- [ ] Stub out static listing data JSON with placeholder photos

### Phase 2 — Listing Page
- [ ] Header (logo, nav, user menu) — structure then style
- [ ] Photo grid (hero + 4 thumbnails + "Show all photos" button)
- [ ] Title block, badges, host summary line
- [ ] Amenities section
- [ ] Sticky booking/price card (scroll behavior must match)
- [ ] Reviews section
- [ ] Map / location section
- [ ] Footer
- [ ] Hover states + micro-interactions across all of the above

### Phase 2a — Micro-interactions & Animation Pass
See `MICROINTERACTIONS_SPEC.md` for the full itemized spec and a ready-to-use
agent prompt. Summary of what's in scope:
- [ ] Photo grid tile hover (scale/brightness + cursor affordance)
- [ ] Save/heart button (fill + scale/bounce on click)
- [ ] Sticky booking card entrance-on-scroll
- [ ] Buttons: hover/active/focus states with consistent easing
- [ ] Amenities "Show all" modal open/close transition
- [ ] Review cards: subtle stagger-in on scroll into view
- [ ] Nav bar shrink/shadow transition on scroll
- [ ] Skeleton/shimmer loading state for images
- [ ] Smooth-scroll for in-page nav links (e.g. jump to Reviews)
- [ ] Tooltip fade-in on rating/badge hover, if present in reference

### Phase 2b — "More places to stay near [location]" Section
See `MICROINTERACTIONS_SPEC.md` §2 for the full spec and prompt. Summary:
- [ ] Section placed at the very end of the listing page, below footer's
      content but before/at footer per reference layout
- [ ] Horizontal card grid (4–6 similar static listings, static JSON data)
- [ ] Each card: image (with on-hover mini image carousel + dot indicators,
      matching Airbnb's real card behavior), price, rating, title, distance
- [ ] Card hover: subtle lift/shadow + image crossfade on dot click
- [ ] Save/heart icon per card, independent state per card
- [ ] Horizontal scroll or paginated arrows if reference uses a carousel
      rather than a static grid

### Phase 3 — Photo Tour Overlay
- [ ] Route or modal triggered by hero image / "Show all photos"
- [ ] Full-screen grid layout matching reference
- [ ] Open/close transition matched (duration + easing)
- [ ] Close button + ESC to close
- [ ] Scroll behavior within overlay

### Phase 4 — Lightbox Overlay
- [ ] Single-photo view triggered from any gallery photo
- [ ] Prev/next arrow controls
- [ ] Keyboard ← / → navigation
- [ ] Transition between photos matched
- [ ] Focus trap + return focus to trigger element on close

### Phase 5 — Accessibility Pass
- [ ] Keyboard-only pass through entire page + both overlays
- [ ] `aria-label` on all icon-only buttons
- [ ] Correct focus order, visible focus rings
- [ ] `alt` text on all images
- [ ] `prefers-reduced-motion` handling (differentiator — see below)

### Phase 6 — Architecture Diagram
- [ ] Draft in Excalidraw: client, CDN, API layer, DB, search (e.g.
      Elasticsearch), image storage/CDN, caching, deployment/CI-CD, scaling
      strategy notes per layer
- [ ] Export as PNG/PDF

### Phase 7 — Packaging
- [ ] Clean up code, remove dead files/console logs
- [ ] Finalize `PROMPT_LOG.md` with your actual prompt sequence
- [ ] Confirm `.claude/agents/` sub-agent configs are included
- [ ] Zip: code + architecture diagram (do NOT push to a public GitHub repo)

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
