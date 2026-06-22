# Home hero, coaches section, and v2 palette migration

Date: 2026-06-22
Status: Implemented

Aligns the homepage hero and coaches section with the `c26-aquatics-rebranding`
design files, and migrates the site's blues to the v2 palette.

## 1. Hero (home variant)

**Goal:** keep the logo, background photo, and parallax; move the copy to the
right; make the headline bold with a magenta accent word.

- Two-column grid: logo lockup left, copy right (`.hero--home .hero__inner`).
- The text headline is now the real `<h1>` (bold/black, uppercase) instead of
  the logo. "Become a **stronger** swimmer" — "stronger" gets `.hero-accent-magenta`.
- Overlay gradient flipped to darken the **right** so the right-column text stays
  legible over the photo.
- Secondary CTA changed from `outline-light` to the new `outline-magenta` variant.
- Stacks logo-over-text on mobile (≤800px).

The original logo-vs-CTA alignment complaint is resolved structurally: the copy
moved to the right column, so the wordmark PNG's baked-in ~17% transparent left
padding no longer reads as a misalignment against the buttons.

## 2. Coaches section

**Goal:** match the design and stop the cards from being too tall.

Root causes of the height: square (1:1) media, a credential badge row, and the
full markdown bio rendered on the homepage.

- New `compact` prop on `CoachesGrid`:
  - 4:3 landscape photo crop (was 1:1).
  - Chrome-less cards: rounded photo + name + role only — no badges, no bio.
- The homepage passes `compact`; the `/coaches` page stays rich (full badges +
  bios) — the same component serves both.
- New `ctaLabel` / `ctaHref` props render a "see more" link **inside** the
  section. Previously the homepage rendered it as an out-of-section
  `<div class="container coaches-cta">` with a dark background clipped to the
  container width, so the white page background showed on its left/right (the
  "hanging off the bottom" seam). Moving it into the full-bleed section fixes that.
- Eyebrow + role use cyan (`--teal-400`, now the v2 cyan).

### Missing-headshot fallback

Headshots are runtime path strings under `/public`. The files don't exist yet
(`public/coaches/*.jpg` are TODO). The component checks `fs.existsSync` at build
time and renders a branded **initials** placeholder (e.g. "RB") in cyan on a navy
gradient instead of a broken `<img>`. Dropping real photos into
`public/coaches/` automatically replaces the placeholder — no code change.

## 3. Palette migration (v1 teal-navy → v2 indigo/cyan)

The live site was built on the original tokens (`#183e53` navy, `#11b3aa` teal).
The v2 mockup (`C26 Aquatics Site v2.dc.html`) evolved to a bluer indigo + cyan
palette that never got ported. Remapped centrally in `tokens/colors.css`:

| Token | Old | New |
|-------|-----|-----|
| `--navy-900` | `#0b1f2b` | `#0e1330` |
| `--navy-800` | `#112d3d` | `#161a40` |
| `--navy-700` (base) | `#183e53` | `#242b6e` |
| `--navy-wordmark` | `#021c36` | `#0a0e26` |
| `--navy-600/500/300/100` | teal-navy tints | indigo tints (were unused) |
| `--teal-500` (base) | `#11b3aa` | `#18bcd0` |
| `--teal-400` (accent) | `#3ec9c0` | `#2fd0e0` |
| `--teal-600/700` | green-teals | cyan equivalents |

Token **names** were kept (`--teal-*`) to avoid churn; the values are now cyan.

Hardcoded old-navy values that bypassed tokens were also moved to
`rgba(14,19,48)`: the hero overlay (`Hero.astro`), the shadow ramp
(`effects.css`), and the consent/mobile scrims.

New tokens added this session: `--magenta-400: #e3267e` (bright magenta for
on-dark accents — hero word + outline CTA). The redundant `--cyan-400` that was
briefly added for coaches was removed once `--teal-400` became cyan.

New Button variant: `outline-magenta` (magenta text + border, fills on hover).

## Outstanding (asset work, not code)

- Real coach headshots → `public/coaches/*.jpg`.
- `wordmark-navy.png` and the brand-intro splash (`BrandIntro.astro`,
  `#021c36`) are baked on the **old** teal-navy. Re-export on the new indigo
  (`#0e1330` / `#242b6e`) to fully match; left untouched to avoid a seam against
  the PNG.
