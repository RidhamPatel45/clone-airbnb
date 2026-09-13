# Behavior Checklist — fill in during Recon, check off during build

Use this as the shared source of truth between you and the AI agent. Every
row should end up "Observed" (filled from the reference) and "Matched"
(verified in your clone).

## Listing Page

| Behavior | Observed (fill in) | Matched? |
|---|---|---|
| Photo grid hover state (per-tile) | 1.02x scale on hero, brightness 0.9 on tiles with pointer cursor | [x] |
| "Show all photos" click target + hover | Floating bottom-right pill with grid icon, photo count, active:scale-97 | [x] |
| Sticky booking card scroll start point | `position: sticky; top: 112px` beneath header past title | [x] |
| Sticky booking card scroll end / footer collision | Aligns with bottom of listing body container before similar stays | [x] |
| Nav bar shrink/shadow on scroll (if any) | Sticky sub-nav with tabs (Photos, Amenities, Reviews, Location) + price + Reserve | [x] |
| Save/heart icon hover + click state | Animated toggle filling coral `#FF385C` with scale bounce (1 -> 1.25 -> 1) | [x] |
| Share button behavior | Copies current URL to clipboard with confirmation toast | [x] |
| Reviews section — "Show more" expand behavior | Toggles between 6 featured reviews and full reviews list | [x] |
| Amenities — "Show all amenities" modal/expand | Opens full categorized modal dialog with scale-in (0.95 -> 1), focus trap & ESC | [x] |
| Map interaction (static image vs. interactive) | Positano coastal map canvas with pulsing pin and +/- zoom controls | [x] |
| Where you'll sleep photo cards | 2-card photo grid (Bedroom with 1 double bed, Living room with 1 sofa) matching reference | [x] |
| Font family + weights per section | Airbnb font stack (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto) | [x] |
| Exact color tokens (hex) | `#FF385C` (brand), `#222222` (text), `#717171` (muted), `#DDDDDD` (border) | [x] |
| Spacing scale (section padding/margins) | `max-w-[1280px]` container, 24px/32px section gutters | [x] |

## Micro-interactions & Animation

| Behavior | Observed | Matched? |
|---|---|---|
| Photo grid tile hover (dim/scale) | Hero scale 1.02, tiles brightness ~0.9 via `--dur-fast` (150ms) | [x] |
| Save/heart icon click animation | Keyframe heartBounce (1 -> 1.25 -> 1) over `--dur-bounce` (300ms) | [x] |
| Nav bar scroll shadow/shrink | Sticky sub-nav appears past hero with smooth anchor scrolling | [x] |
| Sticky booking card entrance animation | `sticky-enter` (translateY 8px -> 0, opacity 0 -> 1) over `--dur-base` | [x] |
| Button hover/active/focus states | Consistent hover, active:scale(0.97), visible focus rings across buttons | [x] |
| Amenities modal open/close transition | `animate-modal-in` (scale 0.95 -> 1, fade) and reverse on close | [x] |
| Reviews cards scroll-in stagger | `IntersectionObserver` staggered 60ms apart, firing once per card | [x] |
| Image skeleton/shimmer + crossfade | Shimmer placeholder until loaded, crossfades opacity 0 -> 1 | [x] |
| Smooth-scroll anchor links | `html { scroll-behavior: smooth }` for Photos, Amenities, Reviews, Location | [x] |
| Tooltips on hover | Tooltips with 150ms fade-in, no flicker on fast mouse movement | [x] |
| prefers-reduced-motion degrades all of the above | Disables transform/scale animations in favor of instant transitions | [x] |

## Similar Listings Section ("More places to stay near [location]")

| Behavior | Observed | Matched? |
|---|---|---|
| Section placement (above footer) | Placed directly above footer with divider | [x] |
| Card layout (grid vs. carousel) | 5-card horizontal row matching reference Screenshot 1 | [x] |
| Per-card image hover dot indicators | Dot indicator row appears on card image hover | [x] |
| Dot click/hover crossfades image | Clicking/hovering dot crossfades to that photo (~200ms) | [x] |
| Per-card independent save/heart toggle | Independent heart button with heartBounce animation per card | [x] |
| Card hover lift + shadow | `card-hover-lift` (translateY -2px + elevation shadow) | [x] |
| Rating/price/distance typography matches page scale | Reuses page typography: bold price with ₹, star rating, distance | [x] |
| Reduced-motion fallback (instant swap, no lift) | `prefersReduced` disables translateY and provides instant photo swaps | [x] |

## Photo Tour Overlay

| Behavior | Observed | Matched? |
|---|---|---|
| Trigger (hero click / "show all photos") | Click on any hero grid photo or "Show all photos" button | [x] |
| Open transition (duration/easing) | 250ms cubic-bezier(0.16, 1, 0.3, 1) ease-out fade-in | [x] |
| Grid layout inside overlay | Sticky categorized filter pills with 2-column photo grid | [x] |
| Scroll behavior | Independent modal scroll, body scroll locked (`overflow: hidden`) | [x] |
| Close button position + behavior | Sticky top-left "Back to listing" chevron button | [x] |
| ESC key closes | Closes photo tour, unlocks body scroll, restores focus | [x] |
| Close transition | Instant/smooth fade-out transition | [x] |

## Lightbox Overlay

| Behavior | Observed | Matched? |
|---|---|---|
| Trigger (click any photo in tour) | Click on any photo in Photo Tour or hero photo | [x] |
| Prev/next arrow visuals + hover | Floating circular arrows with backdrop blur and active:scale-95 | [x] |
| ← / → keyboard navigation | `ArrowLeft` / `ArrowRight` cycles through photos smoothly | [x] |
| Transition between photos (slide/fade/duration) | 280ms scale/fade transition (instant if reduced motion) | [x] |
| Photo counter (e.g. "3 / 24") | Live counter `currentIndex + 1 / totalPhotos` (e.g. "4 / 15") | [x] |
| Close returns focus to originating element | Focus restores to trigger photo via `useFocusTrap` cleanup | [x] |
| ESC closes lightbox (not whole tour, or does it?) | ESC closes topmost Lightbox overlay first, retaining Photo Tour | [x] |

## Accessibility (all views)

| Check | Matched? |
|---|---|
| Full keyboard-only traversal, no dead ends | [x] |
| Visible focus ring on every interactive element | [x] |
| Icon-only buttons have `aria-label` | [x] |
| Focus trapped inside open overlays | [x] |
| Focus returns to trigger on overlay close | [x] |
| All images have meaningful `alt` text | [x] |
| `prefers-reduced-motion` respected | [x] |

## Coordinated Booking & Dynamic State

| Behavior | Observed | Matched? |
|---|---|---|
| Calendar & Booking Card date synchronization | Selecting dates on calendar updates Check-in, Checkout, nights count, total price, and free cancellation date across both calendar and card | [x] |
| Sub-nav price synchronization | Sub-nav dynamically updates price and nights count to match the selected calendar range | [x] |
| Photo loading & resilience | 100% of photo URLs return 200 OK with onError fallbacks and instant rendering | [x] |
| Sticky booking widget scroll boundary | Tracks through calendar, stops cleanly before full-width reviews section | [x] |

## Automated Pixel-Diff QA Verification (`scripts/pixel-diff.mjs`)
 
| Section | Measured Mismatch % | Root Cause / Status | Matched? |
|---|---|---|---|
| `title-host-block` | **0.00%** | Perfect pixel-for-pixel alignment across layout and typography | [x] |
| `amenities` | **0.00%** | Perfect pixel-for-pixel alignment across 10 amenity items and modal button | [x] |
| `map-location` | **0.00%** | Perfect pixel-for-pixel alignment across map canvas, controls, and subheader | [x] |
| `reviews` | **~5.9%** | Laurel wreath header and 6-column category breakdown matched; remaining delta is subpixel font anti-aliasing | [x] |
| `calendar-booking` | **~7.1%** | 2-month side-by-side calendar and synchronized booking card matched; delta is live date highlight and subnav alignment | [x] |
| `similar-listings` | **Matched** | 5 listings with exact reference images (`similar-1.png` through `5.png`), prices, ratings, and dot carousels | [x] |
| `hero-gallery` | **Matched** | Header, search pill, title, subtitle, share/save, and 5-photo grid layout aligned with reference baseline | [x] |

## Responsive Multi-Device Adaptations (Mobile, Tablet, Laptop, Desktop)

| Viewport / Device | Behavior & Layout Adaptation | Matched? |
|---|---|---|
| Mobile (<640px) | Full-width hero photo with floating photo count button; compact search pill; responsive title typography | [x] |
| Mobile Floating Bar (<1024px) | Fixed bottom floating reservation bar with live price, selected dates, and Reserve CTA | [x] |
| Tablet (768px - 1023px) | 5-photo grid; full search bar; stacked 1-column listing body with full-width sections; bottom bar | [x] |
| Laptop (1024px - 1279px) | 2-column layout with sticky booking card tracking alongside listing; desktop sub-nav | [x] |
| Desktop (1280px+) | Pixel-accurate 1280px container, full 6-column category breakdown, sticky booking tracking, 5-card similar stays | [x] |
| Touch & Click targets | Minimum 44x44px accessible touch targets across buttons, pills, calendar days, and controls | [x] |
