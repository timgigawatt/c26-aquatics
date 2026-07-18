# Payload CMS Migration — Design

**Date:** 2026-07-17
**Goal:** Make the C26 Aquatics site fully CMS-driven from the Gigawatt CMS
(Payload 3). The client edits all content in the CMS; publishing triggers a
site rebuild via the tenant build hook.

- **CMS:** `https://gigawatt-cms--gigawatt-lab.us-central1.hosted.app`
- **CMS repo:** `~/data/franzkecreative/development/gigawatt-cms`
- **Tenant:** `c26` (already provisioned with an editor user by the CMS seed)
- **Seeding rules:** see the Gigawatt "Seeding Tenant Content" guide

## Decisions made

| Question | Decision |
|---|---|
| End state | Fully CMS-driven (Astro fetches everything at build time) |
| Unmapped sections | Extend the CMS with new blocks/collections |
| Block shape | Generalized for reuse across tenants, not C26-named |
| Team data | New `programs` collection; blocks reference it |
| Coach↔group links | Display text on team-members, not relationships |
| FAQs | Inline per page; accept subset duplication (9 FAQs, rare edits) |
| Contact form | Stays hard-coded (behavior, not content; awaiting designer) |
| CMS unreachable at build | Fail the build loudly; no stale fallback |

## Architecture

Three workstreams across two repos:

1. **CMS extensions** (gigawatt-cms) — new collections and blocks so C26
   content fits without loss. All changes additive; Gigawatt's own pages are
   unaffected.
2. **Seed script** (c26, `scripts/seed-cms.mjs`) — idempotent script that
   reads the existing Astro content (`src/content/*`, `src/data/*.ts`) and
   pushes it to the CMS. No hand-copying.
3. **Astro refactor** (c26) — replace local content reads with build-time CMS
   fetches; pages become one dynamic block-rendering route. Section
   components are visually unchanged.

Publish → tenant Netlify build hook (existing, 4s debounce) → rebuild.

## CMS extensions

### New collection: `programs` (tenant-scoped)

Generalized training groups — reusable for clubs/gyms/studios.

- `name` (text, required), `slug` (text, required), `order` (number)
- `ageRange` (text), `groupSize` (number),
  `commitmentLevel` (select: developmental | competitive | elite)
- `suggestedPractices` (text), `monthlyHours` (number),
  `monthlyCost` (number), `costPerHour` (number)
- `scheduleOptions` (array): `{ label?, slots: [{ day, time }] }`
- `prerequisites` (array of `{ text }`)
- `evaluationStandards` (array of `{ text }`) — per-group standards live on
  the program
- `description` (textarea), `ctaLabel` / `ctaHref`

Equipment tiers span groups, so equipment is NOT on programs — it is an
inline `tieredList` block on the team page.

### New collection: `announcements` (tenant-scoped)

Mirrors the existing Astro schema so the popup/banner widgets port unchanged:
`title` (required), `body` (textarea), `image` (upload → media), `imageAlt`,
`startDate` / `endDate` (date, required), `draft` (checkbox, default true).

### Coaches → existing `team-members` collection

- `group` = "Coaches", `role` = coach title, `order`, `headshot`,
  `summary` / `bio`
- Coach↔program links seeded as display text (specialties/sections), not
  cross-collection relationships — the site only shows labels, and
  relationships would couple the shared team-members schema to programs.
- Credentials/highlights → generic `sections` (display: list/pills).

### New blocks (in `src/blocks/index.ts`, existing pattern)

| Block | Replaces | Fields |
|---|---|---|
| `comparisonTable` | DifferenceMatrix | eyebrow, heading, intro, leftLabel/rightLabel, rows[] {left, right}, summary, tagline, condensed (checkbox), ctaLabel/ctaHref |
| `teamGrid` | CoachesGrid | eyebrow, heading, subtitle, group (text filter), limit, columns (3\|4), tone (light\|dark), CTA |
| `programLadder` | TracksLadder + TrackTabs + TrainingGroupsTable | eyebrow, heading, intro, display (cards \| tabs \| table) — three views over the programs collection |
| `locationBand` | LocationBand | eyebrow, heading, blurb, address (group), hours[] {label, value}, mapsUrl, image |
| `chipsBand` | ServiceAreaBand | heading, subtitle, chips[] {text, note?}, CTA |
| `tieredList` | equipment tiers | tiers[] {label, intro, items[]} |
| `scheduleList` | meet schedule | heading, periods[] {period, items[]} |

### Extensions to existing blocks (additive, back-compatible)

- `ctaBand`: shared `buttonsField()` for dual CTAs (keep old ctaLabel/ctaHref),
  add `tone` and `watermark` selects.
- `richText`: add `eyebrow` and optional `buttons` — covers MissionBand and
  story/statement sections.
- `hero`: add `image` (upload) and `variant` (select: home | page).

## Page-by-page mapping

All pages become `type: 'generic'`, rendered by one dynamic route.

- **home** — hero (home) → statsBand → richText (mission) →
  comparisonTable (condensed) → programLadder (cards) → teamGrid (limit 4) →
  testimonials → locationBand → chipsBand → faq (home subset) → ctaBand
- **team** — hero → programLadder (tabs) → programLadder (table) →
  richText (philosophy) → tieredList (equipment) → scheduleList (meets) →
  faq (team subset) → ctaBand
- **coaches** — hero → teamGrid (no limit) → ctaBand
- **our-approach** — hero → process (coaching system) → process (principles)
  → richText (pullquote) → comparisonTable (full) → richText (mission/vision)
  → servicesPreview (8 core values) → richText ×3 (wellbeing, facility, open
  water) → ctaBand
- **our-story** — hero → richText (story) → richText (motto) → testimonials
  → ctaBand
- **faq** — hero → faq (full) → ctaBand
- **contact** — hero → richText; form stays in the Astro page shell

Not migrated: `variations.astro` (internal tool), `404.astro`.

FAQ trade-off (accepted): home/team FAQ subsets are copies of entries on the
faq page; an edit may need repeating. Chosen over adding an faq-items
collection (YAGNI at 9 FAQs).

## Astro refactor

- **`src/lib/cms.ts`** — build-time client. Logs in with `CMS_EMAIL` /
  `CMS_PASSWORD` (c26 editor; reads are auth-scoped), fetches published
  pages, programs, team-members, announcements, navigation, footer,
  seo-settings once, cached in-module.
- **`src/pages/[...slug].astro`** — `getStaticPaths()` from CMS pages
  (`home` → `/`); `BlockRenderer.astro` switches on `blockType` and renders
  the existing section components via thin prop-mapping shims. `teamGrid` /
  `programLadder` fetch their collections through the cms client.
- **Widgets** — announcement popup/banner read the CMS collection;
  start/end/draft logic unchanged.
- **Deleted after migration** — `src/content/*`, and `src/data/`: nav.ts,
  stats.ts, approach.ts, tracks.ts, serviceArea.ts, evaluations.ts,
  meetSchedule.ts. **Kept:** `site.ts`, shrunk to infrastructure (GA4 id,
  booking URLs, canonical URL).
- **Errors** — unreachable CMS or failed login fails the build with a clear
  message.
- **JSON-LD** — FAQ schema from faq block items; org/coach schema from
  team-members. Same output, new source.

## Seed script

`scripts/seed-cms.mjs` per the Gigawatt seeding checklist: env credentials,
fail-fast login, upsert-by-slug, `_status: 'published'`, never send `tenant`,
log created vs updated.

Order: media (headshots + section images, idempotent by filename) →
team-members → programs → announcements → pages → navigation / footer /
seo-settings. Imports content directly from the current `src/content`
markdown and `src/data/*.ts` modules. Markdown bodies convert to plain text
with blank-line paragraphs (block textarea convention).

## Rollout

1. CMS repo: add collections + blocks, regenerate types, deploy (additive —
   Gigawatt content unaffected).
2. Run seed from c26; verify in the Payload admin as the c26 editor.
3. Astro refactor on a content-parity basis: diff built `dist/` HTML against
   a pre-migration build; expect near-identical output.
4. Ship; configure the c26 tenant Netlify build hook; delete local content
   files.
5. Client acceptance: Robbie edits an FAQ and publishes an announcement;
   confirm the rebuild fires.

Testing = the parity diff plus a manual pass of all seven pages.

## Caveats

- The USA Swimming restore (~Aug 1, see
  `2026-07-17-usa-swimming-restore.md`) becomes a CMS content edit after this
  migration, not a code change — update that doc's instructions once the
  migration ships.
