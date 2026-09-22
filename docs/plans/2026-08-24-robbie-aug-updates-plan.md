# Robbie's August Updates — Implementation Plan

**Design:** `2026-08-24-robbie-aug-updates-design.md`
**Branch:** `worktree-robbie-aug-updates`

Code-level findings that adjust the design:

- TrackTabs is a pure UI primitive; `team.astro` shapes collection entries into
  its `tracks` prop. There is **no per-group booking button** — "Join the Team"
  CTAs are page-level (Hero, CTABand). Gating therefore = pill + availability
  callout with mailto CTA inside the full group's panel.
- The announcement date window is checked **client-side** (`AnnouncementHost`),
  so it appears/expires on time without rebuilds. The check is
  `now < endDate` (exclusive) → use `endDate: 2026-09-01` to stay live
  through Aug 31. No Sept-1 rebuild needed.
- Contact email: `site.contact.email` = robbie@c26hub.com (`src/data/site.ts`).

## Tasks

### 1. Schema — training-group status
`src/content/config.ts`, `trainingGroups` schema:
```ts
status: z.enum(['open', 'full']).default('open'),
statusNote: z.string().optional(),
```

### 2. Content flips
- `src/content/training-groups/novice-age-group.md`: `status: "full"`
- `src/content/training-groups/advanced-age-group.md`: `status: "full"`
- `src/content/training-groups/senior-elite.md`: `ageRange` → `"11–18 yrs"`

### 3. Homepage ladder mirror
`src/data/tracks.ts`:
- `Track` interface: `status?: 'open' | 'full'`
- Novice + Advanced entries: `status: 'full'`
- Senior Elite: `age: '11–18 yrs'`

### 4. TrackTabs full-group UI
`src/components/widgets/TrackTabs.astro`:
- `Track` interface: `status?: string`, `statusNote?: string`,
  `availabilityHref?: string`
- Tab button: small "Full" pill after the group name when full.
- Panel: when full, an availability callout above the meta block —
  "This group is currently full" + note ("Email us to check availability
  before registering.") + mailto Button.
- `src/pages/team.astro`: pass `status`, `statusNote`, and a mailto href
  (`mailto:${site.contact.email}?subject=${group name} availability`) into
  the tracks mapping.

### 5. Compare table marker
`src/components/widgets/TrainingGroupsTable.astro`: add `status?` to `Row`,
render a "Full" tag beside the group name; pass through in `team.astro`'s
`compareRows`.

### 6. Homepage TracksLadder marker
`src/components/sections/TracksLadder.astro`: small "Full" marker on rungs
where `track.status === 'full'`.

### 7. Evals dates
- `src/data/evaluations.ts`: `evaluationDates` → `'August 24–31'`
- `src/content/faqs/how-do-i-sign-up.md`: "August 22–26" → "August 24–31"
- `src/content/faqs/what-ages.md`: "Senior Elite (13–18)" → "(11–18)"

### 8. Evals announcement
New `src/content/announcements/evals-week-aug-2026.md`:
```yaml
title: "Swim Team Evaluations This Week: Aug 24–31"
startDate: 2026-08-24
endDate: 2026-09-01   # exclusive bound → live through Aug 31
draft: false
```
Body: evals pitch, Momence booking link (`site.booking.team` URL literal —
markdown body can't read site.ts), and the full-groups note pointing at
email before registering.

### 9. Verify
- `npm run build` — schema + type enforcement.
- Grep: no remaining "August 22–26" or "13–18" (outside git history/docs).
- Eyeball (dev server): `/team` pills + callouts on exactly Novice and
  Advanced; compare table tags; homepage ladder markers + "11–18 yrs";
  announcement banner/popup renders, links work.

## Out of scope
- Meet schedule (Robbie follow-up: hold off).
- Homepage growth-claim changes (designer concept pending; brief in design doc).
- Decap CMS enablement (follow-up if status flips become frequent).
