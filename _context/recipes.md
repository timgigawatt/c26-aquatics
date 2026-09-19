# Recipes

Authored. Maps what the client says to exactly what to do. Read by `site-update`
02_interpret together with `structure.md`. Grows only when a request was solved —
never up front. A question asked twice is a bug.

## Vocabulary

From the site itself, 2026-09-18 (no client intake yet):

- "swim team" / "the team" = `pages/team.json` — program ladders, tiers, schedule list, FAQ for the competitive team
- "lessons" / "swim lessons" = the programs with `commitmentLevel: developmental` in `src/content/programs/*.json`
- "programs" / "groups" / "training groups" = `src/content/programs/*.json` (7), rendered by ProgramLadder blocks
- "coaches" = `src/content/team-members/*.json` (4), TeamGrid block on `pages/coaches.json` and home
- "our approach" / "our story" / "faq" / "contact" = pages of those slugs
- "the schedule" = the `scheduleList` block on `pages/team.json` — not the programs' `scheduleOptions`
- "announcement" / "the banner" = `src/content/announcements/*.json` — shown while `draft: false` and today is inside `startDate`–`endDate`
- "open house" = `public/uploads/open-house.png` + `public/open-house.pdf` (static files, linked from content)

## Recipes

<!-- Appended by site-update 04_edit after a questions.md round-trip. -->

## Page-level notes

- Astro 4 here (the other sites are 5/7); `@astrojs/sitemap` is replaced by an inline integration in `astro.config.mjs`.
- `/variations` is an unlinked design page, excluded from the sitemap.
- Media objects carry `sizes.thumb/card/full`; not yet through Astro's image pipeline.
