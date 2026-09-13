# Airbnb Listing Page Clone & Production Architecture

> **Assignment:** Playpower Labs Take-Home Task  
> **Reference:** [https://airbnb-clone-umber-two.vercel.app](https://airbnb-clone-umber-two.vercel.app)  
> **Scope:** Desktop Viewport (1440px target). Three views: Listing Page, Photo Tour overlay, Lightbox overlay.  

---

## 1. Project Overview

This project is a pixel-accurate, behavior-for-behavior clone of a luxury Airbnb listing page built from scratch with Next.js 16 (App Router), TypeScript, and Tailwind CSS. It reproduces the real-world Airbnb experience across layout, typography, interaction design, motion, and accessibility (WCAG AA), accompanied by a production-scale system design architecture diagram.

### Core Deliverables Implemented:
1. **Listing Page (`/`)**:
   - Header with brand logo, interactive search summary pill, language & user menu.
   - Title block with rating (`★ 4.98`), review count (`142 reviews`), Superhost badge, location, Share (with clipboard feedback), and Save (with animated heart state).
   - 5-photo hero gallery grid with hover scale/dimming and floating "Show all 15 photos" button.
   - 2-column layout:
     - Left: Host card with avatar/badge, guest favorite ribbon, property highlights with icons, expandable description, "Where you'll sleep" bedroom cards, "What this place offers" amenities grid with full categorized modal dialog, reviews section with 6 sub-category rating bars, interactive map canvas with pulsing pin and zoom controls, and detailed host profile with Airbnb protection notice.
     - Right: Sticky booking card (`position: sticky`) with live date picker, guest count counter (adults, children, infants), price breakdown math (`$640 x 5 nights`, cleaning fee, service fee, taxes, total), and "Reserve" gradient button.
   - Comprehensive footer with multi-column links, currency/language selectors, and copyright bar.

2. **Photo Tour Overlay**:
   - Full-screen modal overlay opened from "Show all photos" or any hero photo.
   - Smooth 250ms fade-in transition.
   - Sticky header with "Back to listing" chevron, Share, and Save buttons.
   - Category filter pills ("All", "Terrace & Pool", "Living Area", "Bedrooms", "Kitchen & Dining", "Bathrooms", "Exterior").
   - 2-column responsive photo grid with captions and hover zoom.
   - Body scroll locked (`overflow: hidden`), focus trapped inside modal, ESC key to dismiss.
   - Clicking any photo opens the Lightbox directly at that photo index.

3. **Lightbox Overlay**:
   - Single-photo high-resolution viewer with dark backdrop.
   - Live photo counter (e.g. `4 / 15`).
   - Floating circular Previous & Next arrow buttons with hover and active states.
   - Full keyboard navigation: `ArrowLeft` / `ArrowRight` to cycle photos, `Escape` to close.
   - Layered dismissal: Pressing `Escape` closes the topmost Lightbox first without closing the underlying Photo Tour.
   - Category tag and descriptive caption.
   - Respects `prefers-reduced-motion` for instant photo switching.

4. **Production Architecture Diagram**:
   - High-level system design for a global vacation-rental marketplace at Airbnb scale (100M+ listings, 500M+ MAUs, P95 < 250ms SLA).
   - Detailed specification in `ARCHITECTURE.md`.
   - Visual diagrams provided in three formats:
     - Vector SVG: `architecture-diagram.svg`
     - Interactive HTML viewer: `architecture-diagram.html`
     - Editable Excalidraw file: `architecture-diagram.excalidraw`
   - Covers Edge/CDN (Cloudflare/CloudFront Anycast), API Gateway & Federated GraphQL, Microservices (Go, Java, Rust), Distributed Storage & Caching (Sharded Aurora PostgreSQL, OpenSearch with H3 geospatial indexing, Redis Redlock for zero double-booking, ScyllaDB for reviews, S3 photo transcoding pipeline), Kafka CDC event bus, and Multi-Region Kubernetes deployment.

5. **AI Workflow & Sub-Agent Configuration**:
   - Named sub-agents in `.claude/agents/`:
     - `pixel-diff-reviewer.md`: Visual delta auditor for spacing, colors, and typography.
     - `accessibility-auditor.md`: WCAG AA checklist auditor for keyboard navigation, focus trapping, and ARIA labels.
     - `motion-qa.md`: Transition duration, easing curves, and keyboard shortcut reviewer.
   - Complete prompt chronology logged in `PROMPT_LOG.md`.
   - Behavior checklist tracked in `BEHAVIOR_CHECKLIST.md`.

---

## 2. Tech Stack

- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS + CSS Variables for design tokens
- **Icons**: `lucide-react`
- **Architecture Tools**: Excalidraw + Custom SVG diagram

---

## 3. Getting Started Locally

### Prerequisites
- Node.js 18+ (tested on Node v22)
- npm

### Installation & Running
```bash
# 1. Navigate to the project directory
cd airbnb-app

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
# Or run production build:
npm run build
npm run start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 4. Key Differentiators & Accessibility (A11y)

- **`prefers-reduced-motion` Respect**: Automatically detects OS motion preference (`useReducedMotion` hook) and disables scale/slide animations in favor of instant transitions.
- **Focus Management**: `useFocusTrap` ensures keyboard focus remains within open modal overlays and restores focus to the exact originating trigger button upon closing.
- **Body Scroll Locking**: Prevents background page scrolling while either overlay is open.
- **Strict Keyboard Traversal**: `Tab`, `Shift+Tab`, `ArrowLeft`, `ArrowRight`, and `Escape` are fully bound and tested.
- **No Plagiarism / Clean Implementation**: Completely original component architecture built from visual observation, semantic HTML, and structured data.
