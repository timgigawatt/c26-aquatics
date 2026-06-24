# Homepage gap-analysis implementation — design

**Date:** 2026-06-24
**Source:** `C26 Homepage Gap Analysis.html` (rebrand handoff) diffed against `src/pages/index.astro`.
**Scope:** Homepage only. Hero already synced — no action.

## Decisions (locked with Tim)

| Item | Decision |
|------|----------|
| Coaches on home | **Full bio cards** (not compact). Heading → "Coaches & bios". |
| Testimonials | **Single dramatic pull-quote on navy** (not the 3-up paper grid). |
| Location vs service-area | **Both** — keep SEO city-chips band, add a location/hours band. |
| Mission photo | **Placeholder for now** — branded fallback, swap real photo later. |

## New homepage spine

1. Hero — navy ✅
2. StatsBand — navy-900
3. **MissionBand** — white 🆕
4. DifferenceBand — paper
5. TracksLadder — white
6. ⌁ SeamHatch → CoachesGrid — navy (full bios + kraken watermark)
7. TestimonialsBand — navy (single-quote variant)
8. **LocationBand** — paper 🆕
9. ServiceAreaBand — navy (SEO chips, unchanged)
10. FAQAccordion — white
11. ⌁ SeamHatch → CTABand — navy (kraken watermark)

Two seams only (Tracks→Coaches, FAQ→CTA), one hatch + one texture per seam, never stacked.

## Components

- **`sections/MissionBand.astro`** (new): white 2-col. Eyebrow "Our mission", H2 "Stronger swimmers, for life", two paragraphs from the wire, 4:5 image on the right. Optional `image` prop; when absent renders a branded placeholder (kraken on navy gradient + caption), mirroring the coach-card fallback.
- **`sections/TestimonialsBand.astro`** (edit): add `variant: 'grid' | 'feature'`. `grid` = existing 3-up paper (default, other pages). `feature` = one centered pull-quote on navy; takes the first featured testimonial. Home uses `variant="feature"`.
- **`sections/LocationBand.astro`** (new): paper 2-col. Eyebrow "Our home", H2 "One pool. One standard.", blurb, Address/Hours rows from `site.ts` (fallback to wire placeholders — address is still a TODO in data), facility-photo placeholder on the right.
- **`ui/SeamHatch.astro`** (new): 44px `repeating-linear-gradient(45deg, var(--hatch-a), var(--hatch-b))` band, `aria-hidden`. Optional `flush` margins.
- **`CoachesGrid` / `CTABand`** (edit): add optional `watermark: 'left' | 'right'` — oversized `kraken-white.png`, very low opacity, bleeds off-edge, `aria-hidden`. Section gets `position:relative; overflow:hidden`.

## Tokens & copy tweaks

- `tokens/colors.css`: add `--hatch-a: #1a2150` and `--hatch-b: #26306c` in the navy block.
- `index.astro` Coaches: drop `compact`, heading → "Coaches & bios", `watermark="left"`.
- `index.astro` Testimonials: `variant="feature"`.
- `index.astro` FAQ: heading "Common questions" → "Frequently asked".
- FAQ chevron accent: orange → magenta (`--magenta-500`) to match the wire.
- CTABand: headline → "Get in the water", primary CTA label → "Book your first session", keep "Team tryouts" secondary, `watermark="right"`.

## Deferred / flagged

- StatsBand 4th stat: code "100% Certified coaches" vs wire "1 / location" — left as code. Revisit with Robbie.
- Real founders photo + facility photo + confirmed address/hours — placeholders until assets land.
