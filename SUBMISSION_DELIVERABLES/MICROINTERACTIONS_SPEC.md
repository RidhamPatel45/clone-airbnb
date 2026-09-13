# Micro-interactions, Animation & "More Places to Stay" — Add-on Spec

This covers two additions layered onto the existing plan: (1) a richer
micro-interaction/animation pass across the Listing Page, and (2) a
"More places to stay near [location]" section at the bottom of the page,
matching what real Airbnb listing pages (and the reference) show.

Do these **after** Phase 2's static structure/styling is done and matched —
don't animate a layout that hasn't been pixel-verified yet.

---

## 1. Micro-interactions & Animation — itemized spec

| Element | Interaction | Notes |
|---|---|---|
| Photo grid tiles | Hover → slight brightness dim + cursor pointer; hero image slight scale (1.0 → 1.02) on hover | Keep duration short (150–200ms), ease-out |
| Save/heart icon | Click → fill animates in with a small scale bounce (1 → 1.2 → 1) | Also toggle color per reference (red/pink fill) |
| Nav bar | On scroll past hero, add shadow + slightly compress height | Use `IntersectionObserver` or scroll listener with threshold, not a per-frame scroll handler |
| Sticky booking card | Fades/slides in once user scrolls past the title block; sticks with a subtle shadow | Match reference's exact scroll offset where it becomes sticky |
| Buttons (all) | Hover: background/opacity shift; active: slight scale-down (0.97); focus-visible: visible ring | Keep timing consistent — define one shared transition token, don't hand-tune per button |
| Amenities "Show all" | Opens as modal/panel with fade + slight scale-in (0.95 → 1) | Match close the same way in reverse |
| Reviews section | Cards fade/slide up slightly as they enter viewport on scroll (stagger ~50-80ms between cards) | Use `IntersectionObserver`, not a scroll-jacking library — keep it subtle, one-time on first view |
| Images | Skeleton/shimmer placeholder while loading, crossfade to loaded image | Prevents layout jump, reads as polish |
| In-page anchor links (if any) | Smooth-scroll to section instead of instant jump | `scroll-behavior: smooth` or a small JS easing function |
| Tooltips (rating badges, host info) | Fade-in on hover, small delay (~150ms) before showing | Avoid tooltip flicker on fast mouse movement |

**Global rule:** define your easing curves and durations as shared tokens
(e.g. `--ease-standard: cubic-bezier(0.4, 0, 0.2, 1)`, `--dur-fast: 150ms`,
`--dur-base: 250ms`) and reuse them everywhere — this is what makes the
motion feel coherent instead of like a pile of one-off CSS transitions, and
it's also what `motion-qa` will check for.

**Reduced motion:** every animation above must degrade gracefully under
`prefers-reduced-motion: reduce` (instant state change or simple opacity
crossfade, no movement/scale).

### Ready-to-paste prompt for your coding agent

```
Add a micro-interaction and animation pass to the existing Listing Page
components. Do not change any layout, spacing, or structure that has
already been pixel-matched — only add motion/interaction behavior.

Requirements:
1. Define shared CSS custom properties for easing and duration
   (--ease-standard, --dur-fast ~150ms, --dur-base ~250ms) in globals.css
   and use them for every transition below instead of one-off values.
2. Photo grid tiles: on hover, dim slightly (brightness ~0.9) and scale the
   hero image to ~1.02. Use --dur-fast with --ease-standard.
3. Save/heart icon button: on click, toggle filled state with a small
   scale bounce (1 -> 1.2 -> 1) over ~300ms, and persist toggle state.
4. Nav bar: add a scroll listener (throttled via requestAnimationFrame or
   IntersectionObserver on a sentinel element near the hero) that adds a
   shadow and slightly reduces nav height once the user scrolls past the
   hero image.
5. Sticky booking card: fade + slide in (translateY 8px -> 0, opacity 0 ->
   1) the first time it becomes sticky, not on every scroll event.
6. All buttons: consistent hover (opacity/background shift), active
   (scale 0.97), and focus-visible (visible outline ring) states using the
   shared tokens.
7. Amenities "show all" panel/modal: open with fade + scale-in (0.95 -> 1),
   close in reverse.
8. Reviews cards: fade + translateY(8px -> 0) as each card enters the
   viewport, using IntersectionObserver, staggered ~60ms apart, firing only
   once per card (not on every scroll re-entry).
9. Images: show a skeleton/shimmer placeholder until loaded, then
   crossfade in (opacity 0 -> 1, ~200ms).
10. Wrap all of the above in a check for `prefers-reduced-motion: reduce`
    — when set, skip transform/movement and use a simple opacity
    crossfade (or no transition at all) instead.

After implementing, list every new transition/animation you added with its
duration and easing, so it can be checked against the reference and logged
in BEHAVIOR_CHECKLIST.md.
```

After running this, invoke the `motion-qa` sub-agent to verify timing
consistency and reduced-motion handling before moving on.

---

## 2. "More places to stay near [location]" Section — spec

Real Airbnb listing pages end with a horizontal set of similar listings
near the same location, each card showing an image (with a hover-triggered
mini photo carousel + dot indicators), price, rating, and distance. Add
this as a genuine section, not a token placeholder — it's explicitly
called out as something the reference includes.

### Structure
- Section heading: `"More places to stay near [location]"` (pull location
  from your static listing JSON)
- 4–6 cards in a horizontal layout (grid that wraps, or a horizontal
  scroll/carousel if the reference uses one — check during recon)
- Each card:
  - Image area with 3–5 photos; hovering shows dot indicators at the
    bottom of the image; clicking a dot (or hovering over its region)
    crossfades to that photo
  - Heart/save icon, top-right of image, independent toggle state per card
  - Below image: rating (★ 4.9), price per night, short distance/subtitle
    (e.g. "12 km away")
- Card hover: subtle lift (translateY -2px) + shadow increase
- Use static JSON (`/lib/data/similar-listings.json`) — 4-6 fake but
  realistic entries with local placeholder images

### Ready-to-paste prompt for your coding agent

```
Add a "More places to stay near [location]" section at the bottom of the
Listing Page, above the footer, matching the reference site's equivalent
section.

Requirements:
1. Create /lib/data/similar-listings.json with 5 static entries, each
   with: id, title, distanceLabel (e.g. "12 km away"), pricePerNight,
   rating, and an array of 3-5 image paths.
2. Build a SimilarListings component rendering a heading
   ("More places to stay near {location}") followed by a card grid/row.
3. Each card: an image area cycling through that listing's photos on
   hover via small dot indicators at the bottom of the image (crossfade
   between images, ~200ms, using the shared animation tokens from the
   micro-interactions pass — do not introduce new one-off durations).
4. Each card has an independent heart/save toggle button in the top-right
   corner of the image, with the same fill+bounce interaction used
   elsewhere on the page.
5. Card hover: lift (translateY -2px) + increase box-shadow, using
   --dur-fast and --ease-standard.
6. Below the image: rating, price per night, and distance label in the
   same typography/spacing scale as the rest of the page (reuse existing
   type tokens, don't invent new font sizes).
7. Respect prefers-reduced-motion: disable the lift/crossfade animation,
   keep the dot-click image switch as an instant swap instead.
8. This section is static/display-only — cards do not need to link
   anywhere or be functional beyond the hover/save interactions described.

After implementing, add the new interactions to BEHAVIOR_CHECKLIST.md
under a new "Similar Listings Section" heading, and run the
pixel-diff-reviewer against the reference's equivalent section.
```

After running this, invoke `pixel-diff-reviewer` against the reference's
"More places to stay" section, then `motion-qa` for the hover/dot-crossfade
timing.
