# C26 Aquatics — Round 2 (Robbie Bruce edits) design

Date: 2026-07-01
Source: `C26_Aquatics_Web_Compilation.md` (Robbie Bruce emails Jun 19 – Jul 1, 2026 + attachments)

Scope: **styles, structure, and copy only.** Image work (friendlier kraken, pink/teal
outlines, hero shirt logo) is handled separately by the owner.

---

## Decisions locked in brainstorming

1. **Content map:** "Our Approach" becomes one rich page holding all six philosophy
   blocks; "Our Story" is the founder narrative only.
2. **Lessons pages deleted:** C26 is pivoting to competitive-team-only. `swim-lessons`
   and `adult-multisport` pages + their content are removed.
3. **Evaluations content** lives as a section at the bottom of the **Team** page.
4. **Testimonials** auto-rotate (cross-fade) on the homepage feature band only.

---

## New route map

| Nav          | Route           | Status                              |
| ------------ | --------------- | ----------------------------------- |
| Home         | `/`             | rework (copy + ticker + CTA)        |
| Team         | `/team`         | add evaluations/registration section |
| Our Approach | `/our-approach` | **new page** (6 philosophy blocks)  |
| Our Story    | `/our-story`    | **new page**, absorbs `/about`      |
| Coaches      | `/coaches`      | swap to 4 real bios                 |
| FAQ          | `/faq`          | prune lessons FAQs                  |

CTA button copy everywhere: **"Join the Team."**

---

## Section 1 — Structure & the lessons teardown

- **Delete pages:** `swim-lessons.astro`, `adult-multisport.astro`, `about.astro`
  (About content migrates to Our Story / Our Approach).
- **Redirect:** add `/about → /our-story` in `netlify.toml`.
- **Collections:** remove `lesson-tracks` (5 files) + its `config.ts` schema entry.
- **FAQs:** re-tag still-relevant files (sign-up, ages, what-to-bring, parking) to
  team/logistics; delete lessons-only files (makeup-lessons, class-size, team-and-lessons).
- **Testimonials:** keep the 3 that mention lessons but light-edit lesson-specific phrasing.
- **Data/schema:** drop `booking.lessons` from `site.ts`; remove lessons `Service`
  JSON-LD from `schemas.ts`; strip lesson tracks from `tracks.ts` / `TracksLadder` / `TrackTabs`.
- **Nav/footer/mobile menu:** update all three link lists to the new 6 items.

---

## Section 2 — Homepage

1. **Hero** — drop lessons framing; team-focused subtitle. Primary CTA
   "Join the Team" → `/team`; secondary "Explore training groups" → `#tracks`.
   Hero image handled by owner.
2. **Stat ticker** (`StatsBand`) — convert static grid → horizontal scrolling marquee.
   Items: `35+ years coaching experience` · `500+ swimmers coached` ·
   `300+ video stroke sessions` · `21+ states represented` · `4 strokes. 1 development system`.
   Seamless loop (duplicated content), pause on hover, static wrapped row under
   `prefers-reduced-motion`.
3. **MissionBand** — real Mission Statement as lead + "Read our story" → `/our-story`.
4. **DifferenceBand** — 3 pillars from strongest Difference-Matrix rows +
   "See the full comparison" → `/our-approach`.
5. **TracksLadder** — strip lesson tracks; show only the 7 competitive groups.
6. **Coaches / Testimonials / Location / FAQ / CTA** — coaches grid shows 3 of 4;
   testimonials auto-rotate; final CTA → "Join the Team."

---

## Section 3 — Our Approach (`/our-approach`)

One long editorial scroll, reusing existing section patterns:

1. Page header + lead line.
2. **The Approach** prose; closes with navy pull-quote
   "Train with purpose. Develop for the long term. Peak when it matters most. Love the process."
3. **Difference Matrix** — NEW component: full 2-column comparison table (9 rows),
   editorial table on desktop, paired cards on mobile; "The C26 Difference" summary +
   "One Home. One Pool. One Standard." tagline.
4. **Swimming & Mental Wellness** — "More Than a Sport" prose + medical disclaimer in small print.
5. **Mission · Vision · Core Values** — Mission + Vision lead statements; **8 Core Values
   card grid** (NEW component); motto "Inspiring Potential. Pursuing Purpose. Achieving Success."
6. **Our Home** — facility/recovery narrative, 2-col band; "One Pool. One Home. One Standard."
7. **Beyond the Pool** — open-water program on accent feature band.
8. **CTA** — "Join the Team."

New components: `DifferenceMatrix` (table) and `CoreValues` (grid).

---

## Section 4 — Our Story (`/our-story`)

Repurpose the `/about` scaffold (Hero → story → testimonials → CTA):

- Hero: "Our story"; hook subtitle "I quit swimming so your kid does not have to."
- Full first-person narrative; pull-quotes: the hook (top) and "Work Hard. Have Fun. Period." (close).
- **Drop the pillars section** (overlaps Core Values now on Our Approach).
- Keep light-edited testimonials + CTA. Service area stays on homepage only.

---

## Section 5 — Team page: evaluations & registration

Appended below the 7 training-group cards:

- **Team structure note** — 2–3 coaches/group, **$100 annual placement fee**, monthly fee
  includes strength/plyo/injury-prevention, no mandatory fundraising.
- **Evaluations** — dates banner (**Aug 22–26**) + per-group standards as `<details>` accordion.
- **Required equipment** — per-group checklist + preferred-products table + parent sizing note.
- **Proposed meet schedule** — Sept→May vertical timeline/table.
- **Registration CTA** — "Join the Team" → `site.booking.team` placeholder (Stripe link TODO).

**Assumption flagged in code:** eval standards map AG1→Novice, AG2→Advanced,
Junior→Junior Olympic — needs Robbie's confirmation.

---

## Section 6 — Coaches + copy source-of-truth + cleanup

**Coaches (4-bio swap):**

| File                                | Action  | Role                        | Order |
| ----------------------------------- | ------- | --------------------------- | ----- |
| `rob-cole.md`                       | create  | Head Coach / Program Director | 1   |
| `robbie-bruce.md`                   | update  | High Performance Director   | 2     |
| `ruth.md` → `alexa-turpen.md`       | replace | Head Age Group Coach        | 3     |
| `placeholder-coach-3.md` → `nick-fisher.md` | replace | Assistant Coach     | 4     |

- Headshots TBD → placeholder path + `CoachesGrid` branded-kraken fallback for missing images.
- Group assignments live in the bio body (no schema field).
- Keep badge booleans; pull credentials from bio accomplishments (TODO: confirm exact certs).

**Copy source-of-truth** (follows existing `src/data/*.ts` convention):

- Inline prose in `.astro` pages: Our Approach blocks, Our Story narrative.
- New typed data files: `stats.ts` (ticker), `coreValues.ts`, `differenceMatrix.ts`,
  `evaluations.ts`, `meetSchedule.ts`. Mission/Vision strings in `site.ts`.

**Schema / config cleanup:**

- Remove `lesson-tracks` collection from `config.ts`.
- Prune `faqs` enums (`'swim-lessons'` surface, `'lessons'` category) after re-tagging.
- `schemas.ts`: drop lessons `Service` JSON-LD; keep SportsOrganization + SportsTeam +
  FAQPage + coaches ItemList.
- `site.ts`: remove `booking.lessons`; keep/confirm `booking.team`.

---

## Open items owned by Robbie (not blockers)

- Friendlier kraken image + pink/teal outlines + hero shirt logo.
- Coach headshots.
- Stripe / product link for the evaluations registration CTA.
- Confirm the group-name mapping for evaluation standards.
