# Behavior Checklist — fill in during Recon, check off during build

Use this as the shared source of truth between you and the AI agent. Every
row should end up "Observed" (filled from the reference) and "Matched"
(verified in your clone).

## Listing Page

| Behavior | Observed (fill in) | Matched? |
|---|---|---|
| Photo grid hover state (per-tile) | | [ ] |
| "Show all photos" click target + hover | | [ ] |
| Sticky booking card scroll start point | | [ ] |
| Sticky booking card scroll end / footer collision | | [ ] |
| Nav bar shrink/shadow on scroll (if any) | | [ ] |
| Save/heart icon hover + click state | | [ ] |
| Share button behavior | | [ ] |
| Reviews section — "Show more" expand behavior | | [ ] |
| Amenities — "Show all amenities" modal/expand | | [ ] |
| Map interaction (static image vs. interactive) | | [ ] |
| Font family + weights per section | | [ ] |
| Exact color tokens (hex) | | [ ] |
| Spacing scale (section padding/margins) | | [ ] |

## Micro-interactions & Animation

| Behavior | Observed | Matched? |
|---|---|---|
| Photo grid tile hover (dim/scale) | | [ ] |
| Save/heart icon click animation | | [ ] |
| Nav bar scroll shadow/shrink | | [ ] |
| Sticky booking card entrance animation | | [ ] |
| Button hover/active/focus states | | [ ] |
| Amenities modal open/close transition | | [ ] |
| Reviews cards scroll-in stagger | | [ ] |
| Image skeleton/shimmer + crossfade | | [ ] |
| Smooth-scroll anchor links | | [ ] |
| Tooltip fade-in on hover | | [ ] |
| prefers-reduced-motion degrades all of the above | | [ ] |

## Similar Listings Section ("More places to stay near [location]")

| Behavior | Observed | Matched? |
|---|---|---|
| Section placement (above footer) | | [ ] |
| Card layout (grid vs. carousel) | | [ ] |
| Per-card image hover dot indicators | | [ ] |
| Dot click/hover crossfades image | | [ ] |
| Per-card independent save/heart toggle | | [ ] |
| Card hover lift + shadow | | [ ] |
| Rating/price/distance typography matches page scale | | [ ] |
| Reduced-motion fallback (instant swap, no lift) | | [ ] |

## Photo Tour Overlay

| Behavior | Observed | Matched? |
|---|---|---|
| Trigger (hero click / "show all photos") | | [ ] |
| Open transition (duration/easing) | | [ ] |
| Grid layout inside overlay | | [ ] |
| Scroll behavior | | [ ] |
| Close button position + behavior | | [ ] |
| ESC key closes | | [ ] |
| Close transition | | [ ] |

## Lightbox Overlay

| Behavior | Observed | Matched? |
|---|---|---|
| Trigger (click any photo in tour) | | [ ] |
| Prev/next arrow visuals + hover | | [ ] |
| ← / → keyboard navigation | | [ ] |
| Transition between photos (slide/fade/duration) | | [ ] |
| Photo counter (e.g. "3 / 24") if present | | [ ] |
| Close returns focus to originating element | | [ ] |
| ESC closes lightbox (not whole tour, or does it?) | | [ ] |

## Accessibility (all views)

| Check | Matched? |
|---|---|
| Full keyboard-only traversal, no dead ends | [ ] |
| Visible focus ring on every interactive element | [ ] |
| Icon-only buttons have `aria-label` | [ ] |
| Focus trapped inside open overlays | [ ] |
| Focus returns to trigger on overlay close | [ ] |
| All images have meaningful `alt` text | [ ] |
| `prefers-reduced-motion` respected | [ ] |
