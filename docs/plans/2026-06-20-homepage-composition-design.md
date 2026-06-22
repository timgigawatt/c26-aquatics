# C26 Aquatics — Homepage Composition

**Status:** Validated, ready to implement
**Date:** 2026-06-20
**Scope:** Restore two missing homepage sections from the design handoff, replacing `ProgramSplit`. Add the supporting `/adult-multisport` page so all four track cards resolve.

## Goal

The design handoff calls for two homepage sections that never made it into the Astro build:

1. **The C26 Difference** — three editorial pillars (Single location · Consistent coaching · True strength & conditioning) that frame the brand before the visitor has to choose a path.
2. **Age groups & definitions** — a unified 4-track ladder (Infant / Learning → Pre-Compete → Competitive → Adult / Multisport) that replaces the binary Team vs. Lessons mental model currently in `ProgramSplit`.

Restoring both sections puts the homepage back on the design's narrative arc: "here's why we're different" → "here's which track is yours" → "here's who'll coach you."

## Homepage section order

After this change `src/pages/index.astro` composes:

```
Hero
StatsBand
DifferenceBand   ← new
TracksLadder     ← new (replaces ProgramSplit)
CoachesGrid
TestimonialsBand
ServiceAreaBand
FAQAccordion
CTABand
```

`ProgramSplit.astro` is left on disk, unimported. Delete in a follow-up once nothing else references it.

## Components

### `src/components/sections/DifferenceBand.astro` (new)

Three-pillar brand-framing section. Editorial treatment — a left-border blue accent on each pillar, no card chrome.

**Props (all optional, default to design copy):**

```ts
{
  eyebrow?: string;   // "Why C26"
  heading?: string;   // "The C26 difference"
  pillars?: Array<{ title: string; body: string }>;
}
```

**Default pillars (verbatim from the design):**

| Title | Body |
| --- | --- |
| Single location | One pool, one community — no franchised satellites. Every swimmer trains in the same water, to the same standard. |
| Consistent coaching | The same career coaches, season after season. Relationships and progressions that actually compound over time. |
| True strength & conditioning | Real dryland strength and conditioning built into training — we develop athletes, not just swimmers. |

**Visual spec (design `C26 Aquatics Site v2.dc.html` lines 105–118):**

- Background `var(--surface-alt)` so it sits between StatsBand (navy) and TracksLadder (white)
- Container `max-width: 1200px`, vertical padding `var(--section-y)`
- Eyebrow magenta (`var(--magenta-500)`), `var(--fs-eyebrow)`, semi-condensed 600, `letter-spacing: .14em`
- Heading navy display, `clamp(30px, 4vw, 44px)`, uppercase
- Grid `repeat(3, 1fr)`, gap `var(--space-7)`, `margin-top: 36px`
- Each pillar: `border-left: 3px solid var(--blue-500)`, `padding-left: 18px` — no background, no shadow
- Pillar title display 700, 23px, uppercase, navy
- Pillar body 16px / 1.55, body text color
- Collapses to 1-col below 800px; left border + padding stay
- Marks up as `<section aria-labelledby>` matching other sections

### `src/components/sections/TracksLadder.astro` (new)

Four-card track ladder. Replaces `ProgramSplit`. Whole card is the link.

**Props:**

```ts
{
  eyebrow?: string;  // "Programs"
  heading?: string;  // "Age groups & definitions"
  intro?: string;    // "Four tracks take a swimmer from their very first lesson to competition and beyond."
  tracks?: Track[];  // defaults to import from src/data/tracks.ts
}
```

**Visual spec (design lines 122–141):**

- White background, standard container + section padding
- Grid `repeat(2, 1fr)`, gap `var(--space-6)`, `margin-top: 36px`. Collapses to 1-col below 720px.
- Card: `1px solid var(--border)`, `border-radius: var(--r-md)` (14px), white bg, `padding: 24px`, shadow `0 1px 3px rgba(14,19,48,.08)`. Hover `translateY(-3px)` + `0 16px 40px rgba(14,19,48,.16)`.
- Internal 2-col flex:
  - Left rail: big ordinal `01–04`, display 800, 34px, `color: var(--neutral-200)` (intentionally faded)
  - Right rail stacks: age pill → title → desc → magenta CTA text
- Age pill: `var(--blue-100)` bg, `var(--blue-600)` text, 11px uppercase, pill radius
- Title: display 700, 25px, navy, uppercase
- CTA text: `var(--magenta-500)`, semi-condensed 600, 13px, uppercase. **No button chrome** — whole card is the anchor.
- Visible focus ring on the anchor

## Data

### `src/data/tracks.ts` (new)

Typed source of truth for the 4 tracks. Same pattern as `src/data/stats.ts`.

```ts
export interface Track {
  num: string;
  title: string;
  age: string;
  desc: string;
  cta: string;
  href: string;
}

export const tracks: Track[] = [
  { num: '01', title: 'Infant / Learning', age: '6 mo – beginner',
    desc: 'Water acclimation, safety skills, and the foundations of all four strokes.',
    cta: 'View swim lessons →', href: '/swim-lessons' },
  { num: '02', title: 'Pre-Compete', age: 'Developing',
    desc: 'The bridge from lessons to the team — stroke refinement, first training sets, and race basics.',
    cta: 'View program →', href: '/team' },
  { num: '03', title: 'Competitive', age: 'Squad',
    desc: 'Race-focused, periodized training with meets, goals, and measurable personal bests.',
    cta: 'View program →', href: '/team' },
  { num: '04', title: 'Adult / Multisport', age: '18+',
    desc: 'Adult learn-to-swim, fitness swimming, and triathlon / open-water for multisport athletes.',
    cta: 'View program →', href: '/adult-multisport' },
];
```

## New page

### `src/pages/adult-multisport.astro` (new)

Intentionally thin. Exists so the track-card link doesn't 404. Client confirmed Adult / Multisport is a real program offering.

- Reuses `Base` layout + `Hero` + `CTABand`
- Hero: eyebrow "Adult / Multisport"; heading "Adult swim. Multisport training."; subtitle pulled from the track description; primary CTA "Book a first session" to the existing booking URL
- One short prose block under the hero (2–3 sentences) so the page reads as real
- CTABand at the bottom
- SEO title + description set; no other custom head
- No tabs, no pricing, no roster. Iterate later.

`src/data/nav.ts` is unchanged — the page is reachable from the homepage card and from a future Programs dropdown, not the flat top nav.

## Tokens

Add one entry to `src/styles/tokens/colors.css`:

```css
--magenta-500: #c41e6f;  /* secondary accent — DifferenceBand eyebrow, TracksLadder CTA */
```

No other token changes. The audit flagged the magenta accent system as never ported; this is the minimum surface that unblocks both new sections without a broad recolor.

## Testing checklist

- `npm run dev` — homepage renders the new sections in the documented order, no console errors
- Each of the four track cards lands on the right page; no 404 on `/adult-multisport`
- Resize to mobile: DifferenceBand collapses to 1-col below 800px; TracksLadder collapses to 1-col below 720px
- Keyboard tab through TracksLadder: visible focus on each card
- `npm run build` — clean build, no TS error on the `tracks.ts` import

## Out of scope

- Hero background treatment (the design specifies a striped pattern; current photo treatment is intentionally kept)
- Programs dropdown in the top nav
- Per-track detail pages beyond `/adult-multisport`
- Footer column rework
- Sharp 2px button radii
- Lesson methodology section on `/swim-lessons`
- Other audit items (P0 address / coach placeholder, ServiceAreaBand → facilities rework)
