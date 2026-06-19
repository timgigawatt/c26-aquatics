# C26 Aquatics — Site Design

**Date:** 2026-06-19
**Status:** Validated, ready for implementation
**Stack:** Astro 4 (SSG) · Netlify · GitHub (`timothyfranzke/c26aquatics`)

## Goal

Build the production site for C26 Aquatics — a Kansas City–area competitive swim team that also offers swim lessons — by recreating the design handoff in `c26-aquatics-rebranding/project/` as a fast, SEO-strong, AI-discoverable static site. CTAs deep-link to an existing external booking system; no backend.

## Scope

**In:** Team + lessons content only.
**Out:** Triathlon coaching, swim analysis, camps, workouts, online booking, payments, accounts.

## Stack & top-level architecture

- **Astro 4.x, `output: 'static'`** — every page is pre-rendered to flat HTML.
- **Netlify**, connected to GitHub. `main` → production; PRs → preview deploys.
- **No backend.** All booking CTAs link out to the external system. Booking URLs centralized in `src/data/site.ts`.
- **Vanilla CSS** scoped per `.astro` component, fed by the bundle's existing `tokens/*.css` files imported as global stylesheets.
- **Vanilla JS** in component-scoped `<script>` blocks for the mobile menu, FAQ accordion, and training-group tabs. Target <5 KB JS per page.
- **Astro Content Collections** for editable content; structured so Decap CMS can drop in later with no restructuring.
- **GA4** loaded after explicit consent via a lightweight in-house banner.

## Site structure

| Route | Purpose | Schema |
|---|---|---|
| `/` | Hero, programs split (team vs lessons), coaches teaser, testimonials, service area, FAQ teaser, final CTA | `SportsOrganization` + scoped `FAQPage` |
| `/team` | Competitive team — training groups tabbed UI, philosophy, results, join CTA | `SportsTeam` + scoped `FAQPage` |
| `/swim-lessons` | Lessons — age-band tabs (Infant/Child/Teen/Adult), formats, book CTA | `Service` + scoped `FAQPage` |
| `/coaches` | Roster with bios, anchored per coach | `ItemList` of `Person` |
| `/about` | Story, philosophy, service area | `AboutPage` |
| `/faq` | Canonical full FAQ list grouped by category | Full `FAQPage` |
| `/404` | Branded not-found | — |

Utility: `sitemap-index.xml` (auto), `robots.txt`, `llms.txt`, `public/admin/` (Decap placeholder).

Nav order (header + footer): Home → Team → Swim Lessons → Coaches → About → FAQ → [Book Now].

## Content model

Editable content lives in `src/content/` with Zod schemas in `src/content/config.ts`.

- **`coaches/`** — frontmatter: `name`, `role`, `headshot`, `credentials[]`, `usaSwimmingMember`, `safeSportCertified`, `order`. Body = bio.
- **`training-groups/`** — frontmatter: `name`, `ageRange`, `schedule`, `commitmentLevel`, `prerequisites`. Body = description.
- **`lesson-tracks/`** — frontmatter: `name`, `ageRange`, `format` (group | semi | private), `description`. Body = details.
- **`faqs/`** — frontmatter: `question`, `category` (team | lessons | logistics), `surfaces[]` (home | team | swim-lessons | faq), `order`. Body = answer markdown.
- **`testimonials/`** — frontmatter: `quote`, `author`, `role`, `featured`.

Singletons in `src/data/` (TS, type-checked):
- `site.ts` — name, tagline, contact, social, booking URLs, address
- `serviceArea.ts` — Leawood, Lenexa, Olathe, Overland Park, Prairie Village, Shawnee + optional per-city notes
- `nav.ts` — nav arrays

This maps 1:1 to a Decap CMS config: each collection becomes a Decap folder collection; each singleton becomes a file collection.

## Component breakdown

**Layout (`src/components/layout/`)**
- `BaseHead.astro` — `<title>`, `<meta>`, canonical, OG, Twitter, JSON-LD slot, favicon, GA4 (consent-gated), font preconnect.
- `Header.astro` — sticky nav, logo composite (kraken layered over wordmark), 5 nav links, "Book Now" CTA. Vanilla JS mobile drawer.
- `Footer.astro` — contact, social, SafeSport link, service-area city list, legal.
- `ConsentBanner.astro` — bottom-fixed banner; on accept sets `localStorage` flag and loads GA4. No third-party banner library.

**Sections (`src/components/sections/`)** — reused across pages
- `Hero.astro` (variants: `home`, `page`)
- `ProgramSplit.astro` — home decision block (Team vs Lessons)
- `CoachesGrid.astro` — props: `limit`
- `TestimonialsBand.astro`
- `ServiceAreaBand.astro`
- `FAQAccordion.astro` — renders visible `<details>` Q&A AND emits matching `FAQPage` JSON-LD scoped to what's shown
- `CTABand.astro`

**Widgets (`src/components/widgets/`)**
- `TrackTabs.astro` — accessible tabbed UI; reused on `/team` and `/swim-lessons`. Content lives in DOM so it remains crawlable; tabs toggle `hidden`.
- `MobileMenu.astro`

**UI primitives (`src/components/ui/`)** — `Button`, `Card`, `Badge`, `StatBlock` ported from the bundle's `.jsx` references into `.astro`.

## SEO & AI discoverability

**Per-page `<head>`:** unique `<title>` (suffix `| C26 Aquatics`), `<meta description>` (140–160 chars), canonical, OG, Twitter card. Default `og:image` = pre-baked composite at `public/og-default.png` (1200×630).

**JSON-LD per page** (see structure table above). The `FAQPage` schema on `/`, `/team`, and `/swim-lessons` is **scoped to FAQs visible on that page** (filtered via the `surfaces` field). The full `FAQPage` lives on `/faq`.

**Critical rule for FAQ rich results:** the answer copy must render visibly in the DOM on every page that emits its FAQPage JSON-LD. Google strips rich results when schema doesn't match visible content. `FAQAccordion.astro` enforces this by being the single source for both the visible `<details>` markup and the emitted JSON-LD.

**Sitemap:** `@astrojs/sitemap` auto-generates `sitemap-index.xml` with `lastmod`.

**`robots.txt`:** allows all, points to sitemap.

**`llms.txt`:** hand-curated list of pages with one-line summaries — emerging standard honored by ClaudeBot, GPTBot, Perplexity.

**Semantic HTML throughout:** `<header>`, `<nav>`, `<main>`, `<article>`, `<section>` with `aria-labelledby`; one `<h1>` per page.

**Local SEO:** `<address>` element + `PostalAddress` in `SportsOrganization`. Service-area cities rendered as readable text on `/` and `/about`.

**Performance:** target Lighthouse 95+ across all four scores. Astro SSG + no framework runtime makes this realistic.

## Brand assets & OG image

- `src/assets/brand/kraken-white.png` — transparent-bg kraken (from `logo_bg_transparent.png`).
- `src/assets/brand/wordmark-navy.png` — wordmark on `#021c36` (from `logo_text.png`).
- **Header logo**: rendered as kraken layered over wordmark using Astro `<Image>` + CSS positioning. Astro auto-generates optimized WebP/AVIF variants.
- **OG image** (`public/og-default.png`, 1200×630): pre-baked composite of kraken centered over the wordmark on navy. Generated once via `scripts/build-og.mjs` (sharp).
- **Favicons**: derived from the kraken silhouette.

## Repo layout

```
c26/
├── .github/workflows/                ← optional: Lighthouse CI on PRs
├── public/
│   ├── og-default.png
│   ├── favicon.ico, apple-touch-icon.png
│   ├── robots.txt, llms.txt
│   └── admin/                        ← Decap placeholder
├── src/
│   ├── assets/brand/
│   ├── components/
│   │   ├── layout/  sections/  widgets/  ui/
│   ├── content/
│   │   ├── config.ts
│   │   ├── coaches/  training-groups/  lesson-tracks/  faqs/  testimonials/
│   ├── data/                         ← site.ts, serviceArea.ts, nav.ts
│   ├── layouts/Base.astro
│   ├── pages/
│   │   ├── index.astro, team.astro, swim-lessons.astro
│   │   ├── coaches.astro, about.astro, faq.astro, 404.astro
│   ├── styles/                       ← tokens + global.css
│   └── lib/                          ← schema-builders, util fns
├── scripts/build-og.mjs              ← sharp script for OG composite
├── astro.config.mjs
├── netlify.toml
├── package.json
└── README.md
```

`netlify.toml` pins build command, publish dir (`dist`), Node version, and adds security headers (CSP, X-Frame-Options, Referrer-Policy).

## Implementation phases

1. **Skeleton & deploy** — Astro scaffold, Netlify connection, placeholder home, security headers, tokens + brand assets, OG composite + favicons.
2. **Layout + content scaffolding** — `Base.astro`, `BaseHead`, `Header`, `Footer`; populate `src/data/*`; collection schemas + one seed per collection.
3. **Home page end-to-end** — every section component; home FAQ subset + FAQPage JSON-LD; `SportsOrganization` JSON-LD; pixel-check against `C26 Aquatics Site.dc.html`.
4. **Inner pages** — `/team` (+ TrackTabs + SportsTeam + team FAQs); `/swim-lessons` (+ tabs reuse + Service + lesson FAQs); `/coaches` (+ ItemList/Person); `/about` (+ service area + AboutPage); `/faq` (full FAQPage).
5. **Polish & launch** — GA4 + consent, curated `llms.txt`, branded 404, Lighthouse audit (target 95+), cross-browser checks, DNS cutover.

Realistic estimate: ~5–6 focused workdays solo.

## Open items to confirm before launch

- Production domain (default assumption: `c26aquatics.com`).
- Exact external booking URLs for team tryouts vs lesson signup.
- Coach bios, headshots, credentials (USA Swimming, SafeSport).
- Real FAQ content with `surfaces` tags.
- Business contact info, address, social handles for `SportsOrganization` schema.
- GA4 measurement ID.
