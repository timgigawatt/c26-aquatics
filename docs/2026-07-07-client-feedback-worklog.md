# Client Feedback Worklog — July 7, 2026

**Completed:** 2026-07-07 18:21 CDT
**Commits:** `cb59dce` (content edits), `c8870bb` (features)
**Source:** Client call notes, reviewed and prioritized with Timothy

## Content edits (`cb59dce`)

- **Coach rename: Nick Parker → Nick Fisher** — renamed `src/content/coaches/nick-parker.md` to `nick-fisher.md`; updated the name, slug, headshot path, and bio text.
- **Removed "Indoor pool" and "Sauna" amenities** — cleared `site.place.amenities` in `src/data/site.ts`; the location band no longer lists them.
- **Pre-Competitive practice frequency** — changed from "2×/week" to "1–3×/week" in `src/content/training-groups/pre-competitive.md`.
- **Rob Cole coaches all groups** — added all seven training-group slugs to `src/content/coaches/rob-cole.md` and updated his bio sentence to match.
- **Deleted the time-commitment FAQ** — removed `src/content/faqs/time-commitment.md`; its Bronze/Silver/Gold/Platinum tiers did not match the actual C26 group names.
- **Trimmed the USA Swimming FAQ** — removed the Bronze/Silver/Gold/Platinum sentence from `src/content/faqs/usa-swimming-meets.md`, keeping the Missouri Valley LSC sentence.
- **Payment & fees FAQ** — added "Parent volunteer requirements will be released at a later date." to `src/content/faqs/payment-and-fees.md`.

## Features (`c8870bb`)

- **Homepage group cards deep-link to their group** — each card in `src/data/tracks.ts` now links to `/team#<group-slug>` (e.g. `/team#pre-competitive`). The TrackTabs widget already activated tabs from the URL hash, so no new JS was needed.
- **Fixed the schedule "Option 1" losing its selected state** — the group-tab script in `src/components/widgets/TrackTabs.astro` queried every `role="tab"` element inside the widget, which included the Option 1/Option 2 schedule sub-toggle. Clicking any group tab therefore cleared the option highlight. Narrowed the selector to `[role="tab"][data-tab]`.
- **"Join the Team" button in the sign-up FAQ** — added an optional `cta` frontmatter field to the FAQ collection (`src/content/config.ts`), rendered via the standard site button in `FAQAccordion.astro`. The sign-up FAQ (`how-do-i-sign-up.md`) now shows a Join the Team button linked to the Momence booking page via `site.booking.team` (single-sourced; frontmatter uses `href: "booking.team"`). Verified on both the homepage and `/faq`.

## Verification

- `npx astro build` passes; all 8 pages build.
- All seven `/team#<slug>` anchors present in the built homepage.
- Join the Team button confirmed inside the sign-up FAQ answer on `/` and `/faq`.

## Deferred / not done (by decision)

- **Contact form** — client wants a real form, possibly with selection fields. Waiting on a designer mockup before building.
- **Our Story hero image** ("guy in open water, silhouette + background") — Timothy is sourcing the asset.
- **Service area note** — site data already matched the client's list exactly; no change needed.
- **Sign-up FAQ CTA copy** — body text already matched the client's wording verbatim; only the button was added.

## Follow-up reminder

The sign-up FAQ hardcodes evaluation dates of **August 22–26** — update after that window passes.
