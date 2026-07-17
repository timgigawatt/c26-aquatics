# USA Swimming references — removal log & restore plan

**Date removed:** 2026-07-17 (commit `a99fee6`)
**Why:** USA Swimming called the club and asked that all affiliation claims come off
the website until the club license is official (expected ~2 weeks, early August 2026).
Another local club had complained. Leaving the claims up risked a penalty.

**How to restore:** Once the license is official, either revert the removal commit
(`git revert a99fee6`, then resolve any drift) or re-apply each change below by hand.
Verify with `grep -ri "usa swimming" src public` — before restore it should return
nothing; after restore it should match this list.

## What was removed / changed

### Page copy

| File | What it said before | What it says now |
|---|---|---|
| `src/pages/index.astro` (meta description) | "…USA Swimming–registered training groups from developmental to elite." | "…Training groups from developmental to elite." |
| `src/pages/index.astro` (Coaches & bios subtitle) | "USA Swimming–registered coaches building swimmers across the KC metro." | "Professional coaches building swimmers across the KC metro." |
| `src/pages/coaches.astro` (meta description) | "…USA Swimming–registered coaches developing competitive and beginner swimmers…" | "…professional coaches developing competitive and beginner swimmers…" |
| `src/pages/coaches.astro` (hero subtitle) | "USA Swimming–registered, KC-rooted — every coach here is a professional, not a part-timer." | "KC-rooted and career-committed — every coach here is a professional, not a part-timer." |
| `src/pages/coaches.astro` (grid subtitle) | "Each coach is registered with USA Swimming — see bios, credentials…" | "See bios, credentials…" |
| `src/pages/team.astro` (meta description) | "…USA Swimming–registered competitive training groups…" | "…competitive training groups…" |
| `src/pages/team.astro` (hero subtitle) | "USA Swimming–registered training groups for committed athletes…" | "Training groups for committed athletes…" |
| `src/pages/team.astro` (philosophy lede) | "Every group is led by a USA Swimming–registered coach." | "Every group is led by a professional coach." |
| `src/pages/team.astro` (StatBlock) | `100% / USA Swimming–registered coaches` | `100% / Professional career coaches` |

### Coach profiles (`src/content/coaches/`)

All four coaches: `usaSwimmingMember: true` → `false` (hides the teal "USA Swimming"
badge in the bio dialog) and the `"USA Swimming Registered Coach"` credential removed
(credentials also feed the JSON-LD `knowsAbout` on the coaches page).

- **rob-cole.md** — also:
  - highlight `"USA Swimming Zone Distance Camp Director & Coach"` → `"Zone Distance Camp Director & Coach"`
  - bio paragraph: "USA Swimming Zone Distance Camp Director and Coach, USA Swimming
    Camp Coordinator" → "Zone Distance Camp Director and Coach, national camp
    coordinator"; "USA Swimming National Top 10 age-group swimmers" → "National Top 10
    age-group swimmers"
- **alexa-turpen.md** — credentials list removed entirely (it held only the USA Swimming entry)
- **nick-fisher.md** — credentials list removed entirely (same)
- **robbie-bruce.md** — kept `"Open Water Specialist"` credential, dropped the USA Swimming one

### FAQs (`src/content/faqs/`)

- **usa-swimming-meets.md** — **deleted entirely.** It read:
  > **Q:** Do you compete in USA Swimming meets?
  > **A:** Yes. C26 is a USA Swimming-registered club, and our swimmers compete on the
  > Missouri Valley LSC meet circuit.
  >
  > (category: `team`, surfaces: `team`, `faq`, order: 7)
- **safety-standards.md** — dropped the first sentence "Every C26 coach is a registered
  **USA Swimming** member." and reworded "USA Swimming's Minor Athlete Abuse Prevention
  Policy (MAAPP)" → "the **Minor Athlete Abuse Prevention Policy (MAAPP)**"
- **payment-and-fees.md** — "USA Swimming registration and meet entry fees are billed
  separately" → "meet registration and entry fees are billed separately"

### Other

- **public/llms.txt** — removed "USA Swimming–registered" from the site summary and
  "including USA Swimming registration" from the Coaches page line.

## Not changed (intentionally)

- `src/content/config.ts` keeps the `usaSwimmingMember` schema field (defaults to
  `false`), and `CoachesGrid.astro` keeps the badge markup — restoring the badges is
  just flipping the four frontmatter booleans back to `true`.
- References to "Missouri Valley Zone Team Director" and open-water/national meet
  history in coach bios stayed, since they're career history, not club-affiliation claims.
