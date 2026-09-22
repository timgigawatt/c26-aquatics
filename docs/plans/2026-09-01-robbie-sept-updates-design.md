# Robbie's September Updates — Design

Source: Robbie's "Website Updates" email, Sept 1 2026, plus the attached
"C26 Aquatics Master List ' 2026.docx" (Momence payment links).

## Requests

1. Remove everything tied to evaluations Aug 24–31 — evaluations are ongoing.
2. Make it clear enrollment is open throughout the season.
3. Novice & Advanced Age Groups: Option 1 (M/W) full, Option 2 (T/TH)
   limited, new Option 3 (Fri & Sat only) with tons of availability.
4. Junior Olympic: limited availability.
5. Weave in payment options — Monthly and Seasonal Momence links per group.
6. Pre-Senior ages: 11–14 → 11–16.

## Data & content

**Schema (`src/content/config.ts`)**

- Group `status` becomes `'open' | 'limited' | 'full'`. `limited` shows a
  pill and a softened callout but keeps registration active; `full` stays
  email-first.
- Schedule options gain optional `status` (same enum) and `statusNote`
  ("Tons of availability").
- New optional `registration: { monthly, seasonal }` URL pair per group.

**Group frontmatter**

- Novice + Advanced: drop group-level `full`. Option 1 (M/W) `full`,
  Option 2 (T/TH) `limited`, Option 3 (Fri & Sat) `open` with
  "Tons of availability". Option 3 absorbs the Fri/Sat slots previously
  inside Options 1 and 2 (Fri 6:00–7:15 / 7:00–8:15 PM, Sat 2:30–3:30 /
  3:30–4:30 PM). ⚠️ Confirm the Option 3 times with Robbie.
- Junior Olympic: `status: limited`.
- Pre-Senior: `ageRange: "11–16 yrs"`.
- All seven groups get their Momence registration links:

  | Group | Monthly | Seasonal |
  | --- | --- | --- |
  | Pre-Competitive | momence.com/m/903829 | momence.com/m/903820 |
  | Novice Age Group | momence.com/m/903830 | momence.com/m/903821 |
  | Advanced Age Group | momence.com/m/880904 | momence.com/m/903834 |
  | Junior Olympic | momence.com/m/880906 | momence.com/m/903824 |
  | Pre-Senior | momence.com/m/880907 | momence.com/m/903825 |
  | High School Prep | momence.com/m/880908 | momence.com/m/903826 |
  | Senior Elite | momence.com/m/880909 | momence.com/m/903828 |

**Evaluations & enrollment messaging**

- `src/data/evaluations.ts`: `evaluationDates` → ongoing copy.
- `src/content/faqs/how-do-i-sign-up.md`: replace the Aug 24–31 sentence
  with always-accepting copy.
- Delete `announcements/evals-week-aug-2026.md` (expired Sept 1; its
  "Novice/Advanced full" note is now wrong). Add an
  "Enrollment is open all season" announcement running through May 2027.
- `TeamEvaluations` header leads with "Enrollment is open throughout the
  season — evaluations are ongoing."

## UI

**TrackTabs**

- Tab pill: orange "Full" (existing) plus teal "Limited spots" for
  `limited` groups.
- Panel callout for `limited`: teal accent, "Limited availability" title,
  registration buttons remain.
- Schedule option toggle buttons get a status suffix (colored dot +
  Full / Limited / Open); the active option renders `statusNote` under its
  slots when present.
- New registration row below the meta strip: "Register — Monthly" (solid)
  and "Register — Seasonal" (outline), new tab. Suppressed when the group
  is `full`.

**TrainingGroupsTable**

- Chip logic extends: "Limited" chip for `limited` groups; Novice/Advanced
  show "Limited" (some options full, some open).

**Add-ons strip**

- New compact "Memberships & Add-Ons" section on /team after the
  evaluations block. Five cards — Kraken Open Swim Pass (880910), Kraken
  Recovery (892010), Kraken Develop (891989), Kraken Performance (891996),
  Kraken Elite (891997) — one-line description + Monthly link each. Data in
  `src/data/memberships.ts`.

## Out of scope

- Meet schedule updates (head coach said hold off, Aug 23 email).
- Homepage growth-band changes.
