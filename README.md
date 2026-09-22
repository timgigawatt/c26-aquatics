# C26 Aquatics

Production site for C26 Aquatics — competitive swim team + swim lessons in the Kansas City metro.

**Stack:** Astro 4 (SSG) · Netlify · GitHub

## Quick start

```sh
npm install
npm run dev          # local at http://localhost:4321
npm run build        # produces ./dist
npm run preview      # preview built site locally
npm run build:og     # rebuild the social/OG composite image
```

## Layout

- `src/pages/` — routes (`index.astro`, `team.astro`, `swim-lessons.astro`, `coaches.astro`, `about.astro`, `faq.astro`, `404.astro`)
- `src/layouts/Base.astro` — global page chrome
- `src/components/` — `layout/` · `sections/` · `widgets/` · `ui/`
- `src/content/` — editable content collections (Markdown w/ Zod schemas)
- `src/data/` — site-wide singletons (`site.ts`, `nav.ts`, `serviceArea.ts`)
- `src/styles/tokens/` — brand design tokens (CSS custom properties)
- `public/` — static files (favicons, OG image, `robots.txt`, `llms.txt`)
- `scripts/build-og.mjs` — generates `public/og-default.png` from brand assets

## Design source

- `docs/plans/2026-06-19-c26-aquatics-site-design.md` — the validated design plan.
- `c26-aquatics-rebranding/` — Claude Design handoff bundle (HTML prototypes, tokens, components). Reference only; not shipped.

## Deploy

Connected to Netlify. Push to `main` deploys production; PRs get preview URLs.
