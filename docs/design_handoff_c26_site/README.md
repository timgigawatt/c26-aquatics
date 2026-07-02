# Handoff: C26 Aquatics Marketing Site

## Overview
Marketing site for C26 Aquatics, a single-location swim school and competitive team in the Kansas City metro (Overland Park, KS). The site covers: Homepage, Swim Lessons (program landing), Program Track pages (Pre-Compete / Competitive / Adult-Multisport — one template, three data sets), About/Our Story, and FAQ/Support. Primary conversion goal on every page is booking a session ("Book Now" / "Book a session" / "Book a lesson").

## About the Design Files
The bundled file (`C26 Aquatics Site.dc.html`) is a **design reference built in HTML** — a clickable prototype showing intended look, layout, and page-to-page navigation. It is not production code to paste into the app. The task is to **recreate this design in the target codebase's existing environment** (React, Vue, native, etc.), using its established components, routing, and data-fetching patterns. If no frontend framework exists yet for this project, choose the most appropriate one and implement there.

The prototype uses a single-file component with in-memory state to fake page navigation (`state.page`) and content per program track (`trackPages` object) — in production this should become real routes/pages with real data (likely CMS-driven for coach bios, FAQs, pricing, and track copy).

## Fidelity
**High-fidelity.** Colors, typography, spacing, and copy are final-intent. Recreate pixel-close using the codebase's existing component library where equivalents exist (buttons, cards, accordions); introduce new primitives only where the design calls for something the library doesn't have.

Ignore the following — they're prototype-only scaffolding, not part of the production design:
- The intro splash animation (full-screen logo reveal on first visit) — nice-to-have, confirm with the design owner before building.
- The "Replay intro" button and the bottom-center page switcher pill bar — these exist only to let reviewers jump between pages in the prototype.

## Screens / Views

All pages share a **header** and **footer** (see Shared Components) and follow a consistent section-band rhythmn: alternating white / `#f6f9fa` light-gray body sections, with dark-navy (`#0e1330` / `#242b6e`) bands used for emphasis (stats, testimonial, coaches, CTAs) and a diagonal-striped navy band used specifically as the **page header treatment** on every interior page.

### 1. Homepage
**Purpose:** Primary landing page — convert cold traffic into a booked session, and route warm traffic into the right program.
**Layout:** Full-bleed hero → dark stats strip → mission/story split → "C26 Difference" 3-col → Programs 2×2 card grid → Coaches 3-col (dark) → testimonial (dark, centered) → single-location split → FAQ accordion → final CTA (dark) → footer.

- **Nav header:** sticky, white/94%-opacity blur background, 74px tall. Left: kraken logo mark (46×46) + stacked "C26" / "AQUATICS" wordmark. Right: "Programs ▾" mega-menu trigger, "Coaches", "About", "Safe Sport" (external link), and an orange "Book Now" pill button.
  - Mega-menu: on hover/click, a 380px white card drops 70px below nav, 2-col grid of 5 program links, box-shadow `0 16px 40px rgba(14,19,48,.16)`.
- **Hero:** min-height 560px, navy `#0e1330` background, full-bleed photo (`hero-1.png`) at 20% top offset, diagonal dark gradient overlay for text contrast. Two-column content: left = kraken mark + wordmark lockup (masked fade at bottom via CSS mask-image), right = H1 "Become a **stronger** swimmer" (word "stronger" in magenta `#e3267e`), subhead, two CTAs (solid orange "Book a session", magenta-outline "Explore programs").
- **Stats strip:** navy background, 4-col grid, big cyan numbers (`≤4`, `20+`, `365`, `1`) over small uppercase gray-blue labels.
- **Mission/story:** white background, 2-col (1.05fr/.95fr), left = eyebrow + H2 + two paragraphs, right = 380px placeholder image card.
- **The C26 Difference:** light-gray background, magenta eyebrow, H2, 3-col grid of left-border-accented (blue, 3px) title+description blocks.
- **Programs grid:** white background, blue eyebrow, H2, intro line, 2×2 grid of clickable cards (white, 1px border, 14px radius, subtle shadow, lift-on-hover) each showing a large ghost number, an age-range pill, title, description, and a magenta text CTA.
- **Coaches:** navy background with a faint bottom-left kraken watermark, cyan eyebrow, white H2, 3-col grid of dark cards (`#161a40`) — photo placeholder top, name/role/bio below.
- **Testimonial:** solid `#242b6e` background, centered, oversized cyan quote-mark glyph, bold uppercase pull-quote, attribution line.
- **Single location:** light-gray background, 2-col split — address/hours details left, map/exterior placeholder right.
- **FAQ:** white background, blue eyebrow, H2, accordion list (6 items) — bottom-border rows, question in bold uppercase navy, +/– toggle in magenta.
- **Final CTA:** navy band (preceded by a 44px diagonal-stripe divider strip), centered H2, subtext, single orange CTA.
- **Footer:** navy, 4-col grid — brand blurb, Programs links, Club links, Safe Sport callout box with external link — divider, then copyright + legal links row.

### 2. Swim Lessons (program landing)
**Purpose:** Convert visitors interested in lessons; browse by age group; see pricing.
**Layout:** Topbar (compact, 64px) → breadcrumb + in-page subnav tabs (Overview / Ages / Pricing / FAQ — currently visual only, not wired to scroll) → hero band → benefits 4-col → philosophy (prose) → age-group card grid → pricing 3-col → FAQ accordion → final CTA → footer.
- **Hero:** now a **striped-kraken band** (see Shared: Page Header Band), two-column: left = eyebrow "Swim Lessons · Infant / Learning" (cyan), H1 "Swim lessons for **every age**" (magenta highlight), subhead (white/85%), CTAs (solid orange "Book a lesson", magenta-outline "See pricing"); right = light placeholder photo card, 360px tall.
- **Benefits:** light-gray, 4-col, left-border-accent (blue) mini cards.
- **Philosophy:** white, narrow (820px) column, eyebrow + H2 + two paragraphs of prose.
- **Age groups:** light-gray, 4-col grid of cards — 150px placeholder image top, age-range pill, title, program URL slug shown as small gray text, magenta "View lessons →" link.
- **Pricing:** white, 3-col cards (Group / Semi-private / Private) — center tier ("Semi-private") is visually featured with a navy 2px border, shadow, and a floating "Most popular" pill.
- **FAQ / Final CTA / Footer:** same structure as homepage FAQ/CTA/footer, lesson-specific copy.

### 3. Program Track pages (Pre-Compete, Competitive, Adult/Multisport)
**Purpose:** One reusable template driven by a per-track data object (title, eyebrow, intro, 4 "what you'll work on" points, 3-step "how it progresses" levels, CTA headline/sub). Three tracks share this template.
**Layout:** Topbar → breadcrumb → hero band → "what you'll work on" 4-col → "how it progresses" 3-col (dark navy) → final CTA (solid `#242b6e`) → footer.
- **Hero:** same striped-kraken band treatment as Lessons hero, two-column with photo placeholder, CTAs "Book a session" (orange) + "Talk to a coach" (magenta outline).
- **What you'll work on:** light-gray, 4-col left-border-accent cards, sourced from `currentTrack.points`.
- **How it progresses:** navy background, cyan eyebrow, white H2, 3-col grid — each with a large cyan step number (01/02/03), a top border rule, title, description, from `currentTrack.levels`.
- **Final CTA:** solid `#242b6e`, headline/sub pulled from `currentTrack.ctaHeadline` / `ctaSub`.

### 4. About / Our Story
**Purpose:** Brand story, differentiation, and Safe Sport commitment.
**Layout:** Topbar → striped-kraken hero band (title only) → centered mission statement (white) → story prose (light-gray, narrow column) → "C26 Difference" 3-col (reused from homepage) → Safe Sport commitment banner (solid `#242b6e`, split content/CTA) → final CTA (navy) → footer.
- This page's hero is the **reference implementation** of the striped-kraken band — all other interior headers were standardized to match it in this round of work.

### 5. FAQ / Support
**Purpose:** Self-serve support hub grouped by topic, with a contact fallback.
**Layout:** Topbar → breadcrumb → striped-kraken header band (title + intro paragraph, no CTA) → grouped accordion list (3 groups: Getting started / Scheduling & policies / Billing & membership, each with a bordered section title) → contact CTA band (`#242b6e`, two buttons: "Contact us" solid orange, "Book a session" outline) → footer.

## Shared Components

### Page Header Band (standardized across About, Swim Lessons, Program Track, FAQ)
A recurring dark hero/header treatment used to open every interior page:
```
background: repeating-linear-gradient(45deg, #1a2150, #1a2150 11px, #26306c 11px, #26306c 22px)
```
- A kraken watermark image (`kraken-white.png`) absolutely positioned (varies by page — right/bottom or right/center), large (~360–380px), opacity 0.07–0.08.
- A dark overlay gradient on top: `linear-gradient(180deg, rgba(14,19,48,.35), rgba(14,19,48,.62))` (About uses a slightly stronger `.4`/`.7`).
- Content sits in a `position:relative` wrapper above the overlay.
- Eyebrow text color: cyan `#2fd0e0`. Title: white, uppercase, Barlow Condensed 800.
- Body copy on the band: `rgba(255,255,255,.85)`.
- Richness varies by purpose: About/FAQ are lean (title ± one paragraph, no CTA); Lessons/Track are full two-column heroes (headline + CTAs + photo) because those pages need to convert directly.

### Nav header (all pages except homepage use a compact 64px variant)
Sticky, white ~94% opacity with backdrop blur, bottom 1px border `#d7e0e5`. Homepage version is taller (74px) with the full mega-menu; interior pages use a simplified topbar (logo + Safe Sport link + Book Now button).

### Breadcrumb
14px padding, white background, `#5d7480` text, `›` separators in `#b9c7ce`, current page bold navy.

### FAQ Accordion Item
Bottom-border row (`#d7e0e5`), question in Barlow Condensed 600 20px uppercase navy, answer paragraph revealed on click, toggle glyph `+`/`–` in magenta `#e3267e`.

### Footer
Consistent across all pages: navy `#0e1330`, top border `rgba(255,255,255,.08)`, 4-column grid (brand blurb / Programs links / Club links / Safe Sport callout with external link to uscenterforsafesport.org), then a bottom bar with copyright + Privacy/Terms/Safe Sport links.

### Buttons
- **Primary (orange):** `background:#f38f1f; color:#3a2202;` Barlow Condensed 700 uppercase, 2px border-radius, `box-shadow: 0 6px 18px rgba(243,143,31,.3)`.
- **Secondary (outline):** 2px solid `#e3267e` (magenta) or `rgba(255,255,255,.5)` (on dark banners), transparent background, matching text color.

## Interactions & Behavior
- **Programs mega-menu:** opens on mouse-enter of the nav item (and on click, for touch), closes on mouse-leave; positioned absolute, centered under trigger.
- **FAQ accordions:** single-open-at-a-time per list (clicking a question closes any other open item in that same list); implemented independently per page (home FAQ, lessons FAQ, support FAQ groups each track their own open index).
- **Program card / track navigation:** clicking a program card or mega-menu item routes to that program's page/section.
- **Card hover:** program cards and age-group cards lift (`translateY(-3px)`) and gain a stronger shadow on hover, ~0.2s transition.
- **Intro splash (prototype-only, confirm before building):** on first visit (session-scoped, respects `prefers-reduced-motion`), a 1.5s full-screen navy splash with the kraken mark and glow/reveal animation plays before the homepage, dismissible by click.
- **Responsive behavior:** not explicitly designed/tested in this prototype (built at a fixed ~1280px reference width). Confirm breakpoint behavior with the design owner before building mobile — recommend stacking all 2-col/3-col/4-col grids to single column below ~768px, and collapsing the nav to a hamburger/menu drawer.

## State Management (prototype-only reference)
The prototype fakes routing/data with local component state — translate to real routes and real data sources in production:
- `page`: which screen is showing (home / lessons / precompete / competitive / multisport / about / faq).
- `menuOpen`: mega-menu open/closed.
- `faqOpen`, `homeFaqOpen`, `faqSupportOpen`, `subTab`: which accordion/tab item is open, per list.
- `trackPages` object: per-track content (title, eyebrow, intro, points[], levels[], CTA copy) — this should become CMS-driven or a typed data file in production, keyed by track slug.

## Design Tokens

**Colors**
- Navy (primary dark bg): `#0e1330`
- Navy (secondary/deep-blue bands): `#242b6e`
- Navy stripe pair (page header band): `#1a2150` / `#26306c`
- Ink (body text): `#2c3f49`
- Ink (headings): `#242b6e`
- Blue (accent / links / eyebrows on light bg): `#2f63ef`
- Cyan (accent on dark bg — eyebrows, numbers): `#2fd0e0`
- Magenta (accent — highlights, secondary CTAs, toggles): `#e3267e` (also `#c41e6f` for eyebrow-weight magenta on light bg)
- Orange (primary CTA): `#f38f1f`, text-on-orange `#3a2202`
- Light gray (section bg): `#f6f9fa`
- Border gray: `#d7e0e5`
- Muted text (on light bg): `#5d7480`
- Muted text (on dark bg): `#9fb8c3`

**Typography**
- Display/headings: **Barlow Condensed**, weights 500/600/700/800, uppercase, tight letter-spacing (`-0.02em`), tight line-height (`.9`–`1.05`). Fluid sizing via `clamp()` (e.g. H1 `clamp(44px,6vw,72px)`).
- Eyebrows/labels/nav: **Barlow Semi Condensed**, weight 600, uppercase, `letter-spacing:.14em` (eyebrows) or `.06em` (nav), 11–14px.
- Body copy: **Barlow**, weights 400/500, 14–19px, line-height 1.5–1.6.
- Google Fonts import: `Barlow:wght@400;500;600;700`, `Barlow+Condensed:wght@500;600;700;800`, `Barlow+Semi+Condensed:wght@600;700`.

**Spacing**
- Page max-width: 1200px (1200px content), narrower prose columns at 820px/900px.
- Section vertical padding: 96px (standard), 64–80px (denser sections/heroes), 48px (stat strips).
- Horizontal page padding: 32px.
- Grid gaps: 24–56px depending on density.

**Radius**
- Cards/buttons: 2px (buttons), 8–14px (cards/images).

**Shadows**
- Card default: `0 1px 3px rgba(14,19,48,.08)`
- Card hover / menu: `0 16px 40px rgba(14,19,48,.16)`
- Orange button: `0 6px 18px rgba(243,143,31,.3)`

## Assets
Included in `assets/` (originals in project's `assets/` folder — confirm final production-quality versions with the design owner, several placeholders remain):
- `kraken-white.png` — white kraken mark, used on dark backgrounds and as watermark.
- `kraken-navy.png` — navy kraken mark, used in nav/footer on light backgrounds.
- `wordmark-light.png` — light "C26 Aquatics" wordmark, homepage hero only.
- `hero-1.png` — full-bleed homepage hero photo.

Not included / still placeholder in the design (gray diagonal-stripe boxes with a label caption) — need real photography before build:
- Coach portraits (3), lesson/program photos, facility/exterior or map image, mission/story photo.

## Files
- `C26 Aquatics Site.dc.html` — the full prototype (all 5 pages, shared nav/footer, and the mega-menu/accordion/track-routing logic described above). This is the primary reference; read it top-to-bottom alongside this README for exact markup/inline-style values not restated here.
- `screenshots/01-homepage.png` — Homepage (hero, above the fold).
- `screenshots/02-lessons.png` — Swim Lessons hero.
- `screenshots/03-program-track.png` — Program Track template (Pre-Compete shown; Competitive and Adult/Multisport share the same layout with different copy).
- `screenshots/04-about.png` — About / Our Story hero.
- `screenshots/05-faq.png` — FAQ / Support header + first accordion group.

Screenshots show the top of each page only (the interactive prototype has full scroll depth — see the HTML file for every section).
