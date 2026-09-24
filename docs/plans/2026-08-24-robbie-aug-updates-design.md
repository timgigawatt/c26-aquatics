# Robbie's August Updates — Design

**Date:** 2026-08-24
**Source:** Robbie Bruce email, "Website Updates," Aug 23 2026 (+ follow-up same day)

## Scope

From Robbie's five items:

| # | Item | Disposition |
|---|------|-------------|
| 1 | Evals week Aug 24–31 | **Dev, this week** — dates + announcement |
| 2 | "Fastest Growing Team in the Midwest" (113 swimmers) | **Designer** — brief sent, nothing ships until concept lands |
| 3 | Novice & Advanced Age Group full — email before registering | **Dev, this week** — status field + gated CTA |
| 3b | Senior Elite ages 11–18 | **Dev, this week** — data fix |
| 4 | Confirmed meet schedule | **Deferred** — Robbie's Aug 23 follow-up: head coach says hold off |

No live CMS today: Decap is a placeholder (`public/admin/README.md`); all edits are
git commits. The changes below keep the collections Decap-compatible for later.

## Data changes

1. **Training-group status field** in `src/content/config.ts`:

   ```yaml
   status: open | full        # optional, default open
   statusNote: string         # optional override copy
   ```

   Set `status: full` on `novice-age-group.md` and `advanced-age-group.md`.
   Reopening a group is a one-field flip. Mirror the flag in `src/data/tracks.ts`
   for the homepage ladder (or read from the collection if that refactor is cheap).

2. **Senior Elite ages:** `senior-elite.md` `ageRange` "13–18 yrs" → "11–18 yrs",
   plus the `tracks.ts` mirror. Grep site-wide for "13–18" to catch stale mentions.

3. **Evals dates:** `src/data/evaluations.ts` `evaluationDates`
   "August 22–26" → "August 24–31". Grep for the old string.

Unknown/missing `status` renders as open — a typo can never block an open group.

## Surfacing full groups

1. **`/team` cards (TrackTabs):** "Group full" pill on the card header, plus a line:
   "This group is currently full. Email us to check availability before registering."
   Mailto with prefilled subject, e.g. "Novice Age Group availability".
2. **CTA gating:** full groups' Momence booking button swaps to "Check availability"
   (mailto or `/contact`). Open groups untouched.
3. **Homepage TracksLadder:** small "Full" marker on the two rungs — visible, not loud.
4. **Contact page:** unchanged; the "Joining the team" interest option already routes these.

## Evals announcement

New `src/content/announcements/evals-week-aug-2026.md` (existing schema, no code):

```yaml
title: "Swim Team Evaluations: Aug 24–31"
startDate: 2026-08-24
endDate: 2026-08-31
draft: false
```

Body: evals-week pitch + Momence booking CTA + one line flagging the full groups
(eval traffic is exactly the audience that needs the gating message).

- Verify the `endDate > buildNow` filter is end-of-day inclusive; if exclusive,
  use `endDate: 2026-09-01`.
- Update `evaluationDates` in the same pass so `/team` agrees with the popup.
- Static build on Netlify: announcement visibility is decided at build time.
  Manual rebuild on Sept 1 to retire it (or a scheduled rebuild).

## Designer brief — growth claim

- Claim: "Fastest Growing Team in the Midwest" — 113 swimmers and climbing.
- Ask: badge/callout concept for the homepage. Candidate placements: hero eyebrow
  badge, featured break in the stats band, or a standalone strip between hero and
  mission band.
- Constraints: existing teal/indigo/magenta palette; works on light and dark
  sections; swimmer count must be live text (it will keep changing), not artwork.
- Reference: current homepage sections + stats ticker.

Interim homepage changes: none, per decision.

## Testing & rollout

- `astro build` (schema enforcement incl. new `status` enum).
- Eyeball pass: `/team` pills + swapped CTAs on exactly Novice and Advanced;
  ladder markers; Senior Elite "11–18 yrs"; announcement popup/banner + links.
- Greps: no stale "13–18" or "August 22–26".
- One branch, one deploy — evals items are the time-sensitive core, ship today.
- Follow-ups: Sept 1 rebuild; flip `status` when Robbie reopens a group; consider
  enabling Decap if full/open updates become recurring.
