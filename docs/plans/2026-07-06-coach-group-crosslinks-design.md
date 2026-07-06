# Coach ↔ Training Group Cross-Links

**Date:** 2026-07-06
**Status:** Approved

## Goal

Coach bios show the training groups each coach leads, as links; each training
group's detail panel shows its coaches, as links. One source of truth, edited
in one place, validated at build time.

## Data model

The relation is stored once, on the coach side, in each coach's frontmatter.

- `groups` changes from free-text display names to an **ordered** array of
  `reference('training-groups')`. Astro validates every slug against the
  training-groups collection at build time; a typo fails the build. Array
  order is the chip display order.
- `specialty: string` is replaced by `programs: string[]` — non-group
  offerings ("Strength", "Open Water") rendered as unlinked chips after the
  group chips. Robbie Bruce carries two, so a single string no longer fits.

Both directions are derived, never stored:

- **Coach → groups:** resolve slugs via `getEntries()`, giving real display
  names and link targets.
- **Group → coaches:** `team.astro` filters the coaches collection for
  coaches whose `groups` include the group's slug, sorted by coach `order`.

## Confirmed assignments (client data, 2026-07-06)

| Coach | Groups (in order) | Programs |
|---|---|---|
| Rob Cole | high-school-prep, senior-elite, junior-olympic | Strength |
| Robbie Bruce | pre-senior, high-school-prep | Strength, Open Water |
| Alexa Turpen | novice-age-group, advanced-age-group, pre-competitive, junior-olympic | — |
| Nick Parker | pre-competitive, novice-age-group, advanced-age-group, junior-olympic | — |

Client shorthand resolved: "Age Group" → both Novice and Advanced Age Group;
"Comp" → Pre-Competitive; "Junior" → Junior Olympic.

**Rename:** Nick Fisher → Nick Parker (file, slug, `name`, headshot path),
per client correction.

**Copy fix:** Rob Cole's bio sentence listing his groups is updated to match
the confirmed assignments.

## Coach → group links (`CoachesGrid.astro`)

- Group chips (card face and bio dialog) become links to
  `/team#<group-slug>`, keeping current chip styling plus a hover state.
- Program chips render after group chips, unlinked (no page exists for them).
- Compact mode (homepage) is unchanged.

## Deep-linking into group tabs (`TrackTabs.astro`)

The widget already has `activate(slug)` and slug-keyed panels. Add:

1. On load, if `location.hash` matches a track slug, activate that tab and
   scroll the widget into view.
2. Listen for `hashchange` for in-page links and back/forward.

Panels are server-rendered, so no-JS visitors degrade to the default tab.

## Group → coach links (`TrackTabs` panels, via `team.astro`)

- Each panel gets a "Coached by" row after the description/meta: small
  circular headshot, name, role, linking to `/coaches#<coach-slug>` (coach
  cards already have slug ids).
- `team.astro` computes a `coaches: { slug, name, role, headshot }[]` per
  track; `TrackTabs` stays presentation-only.
- Empty state: no assigned coaches → the row doesn't render.
- Missing headshot → initials-in-a-circle fallback, matching the coach cards.

## Verification

`npm run build` (exercises reference validation), then eyeball /coaches and
/team: chips link to the right tab, "Coached by" links land on the right
card, hash deep-links activate the correct tab.
