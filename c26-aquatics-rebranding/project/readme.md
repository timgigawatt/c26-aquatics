# C26 Aquatics — Design System

The brand system for **C26 Aquatics** (formerly c26hub.com), a premium swim & aquatic-performance academy in the Kansas City metro. This system powers the rebrand: marketing site, program pages, and any future collateral.

> **Note on sources:** This system was built from the approved low-fi wireframes (Homepage *Option B — athletic*, Swim Lessons *Option 1 — SEO depth*) and the brand colors taken from the client's logo (navy `#183E53`, orange `#F38F1F`). No prior codebase or Figma was provided. The **kraken mark** is the supplied logo art; it ships in `assets/` in white, navy, teal, and orange.

---

## What's here

| Path | What it is |
|------|------------|
| `styles.css` | Global entry point. Link **this** file. `@import`s all tokens + fonts. |
| `tokens/` | CSS custom properties — `colors`, `typography`, `spacing`, `effects`, `fonts`. |
| `components/` | Reusable React primitives — `actions/` (Button, Badge), `surfaces/` (Card, StatBlock), `navigation/` (Tabs), `forms/` (Input, Select). |
| `ui_kits/homepage/` | Hi-fi **Option B** homepage (`HomeView`). |
| `ui_kits/swim-lessons/` | Hi-fi **Option 1** Swim Lessons page (`SwimLessonsView`). |
| `guidelines/` | Foundation specimen cards (colors, type, spacing, brand). |
| `SKILL.md` | Agent-Skill manifest for reuse in Claude Code. |

---

## CONTENT FUNDAMENTALS

**Voice:** Motivational and performance-driven, but never boastful. C26 speaks like a confident head coach — direct, encouraging, and specific.

- **Person:** Address the reader as **you**; refer to the academy as **we / C26**.
- **Casing:** Headlines and labels are **UPPERCASE** (condensed display type). Body copy is sentence case.
- **Tone:** Active verbs, short declaratives. "Become a stronger swimmer." "Get in the water." "Start with one lesson."
- **Specifics over adjectives:** Lead with concrete proof — "classes of four or fewer," "year-round indoor pool," "365 days," "certified coaches" — rather than vague praise like "the best lessons in town."
- **Reassurance for parents:** Safety and confidence language balances the performance edge ("water comfort and safety before speed").
- **No emoji.** No exclamation overload. Punchy, not loud.

Example headline + subhead pairing:
> **BECOME A STRONGER SWIMMER**
> Expert coaching, classes of four or fewer, and a year-round indoor pool — for every age and every goal.

---

## VISUAL FOUNDATIONS

**Color.** Three brand colors, bright and bold per the client brief:
- **Navy `#183E53`** grounds the system — headers, body text, dark sections, footers.
- **Teal `#11B3AA`** is the energy/secondary — eyebrows, highlights, active stat figures, focus rings.
- **Orange `#F38F1F`** is reserved for **action** — primary CTAs, "most popular" markers, key accents. One orange action per view, ideally.
Neutrals are cool-leaning (paper `#F6F9FA`, mist `#EAF0F3`) so they sit naturally beneath navy. Full ramps live in `tokens/colors.css`.

**Type.** The **Barlow** superfamily.
- **Barlow Condensed** (800/700) — athletic display headlines, set UPPERCASE with tight tracking (−0.02em) and line-height near 0.9. This is the signature of the brand.
- **Barlow** (400–600) — humanist body and UI text, set at 1.55 line-height for readability.
- **Barlow Semi Condensed** — eyebrows, badges, and labels (uppercase, tracked +0.14em).

**Layout.** 1200px max container, 32px gutters, generous 96px section rhythm (`--section-y`). Sections alternate white → paper → navy to create athletic pacing. Stats and final CTAs land on the darkest navy (`#0B1F2B`).

**Backgrounds.** Solid color fields, not gradients — except a single dark protection gradient over full-bleed hero photography (bottom-up navy fade) so white headlines stay legible. Imagery is intended to be crisp, cool-toned action/pool photography (placeholder hatching stands in until real photos arrive).

**Corners.** Athletic = squared actions, soft content. Buttons use a near-square `2px` radius; inputs `4px`; content cards `14px`; tabs and badges are full pills.

**Borders.** Hairline `1px` cool-gray lines (`--line`) divide sections; a bold `2–3px` teal or navy left-rule marks differentiator blocks and active states.

**Shadows.** Restrained and cool-tinted (navy-based rgba), three steps (sm/md/lg). Orange CTAs carry a soft warm glow (`--shadow-action`).

**Motion.** Quick and purposeful — `120–200ms`, ease-out. Interactive cards lift `3px` on hover with a deepened shadow. No bounces, no long animations.

**States.** Hover = lift + shadow (cards) or slight darken (buttons → `--orange-600`). Focus = `3px` teal focus ring. Active tab = filled navy pill / orange underline.

---

## ICONOGRAPHY

No icon assets existed in the source material. **Recommendation:** use **[Lucide](https://lucide.dev)** (CDN) — its even 2px stroke and rounded-square geometry match Barlow's humanist-athletic feel. Use line icons at `1.75–2px` stroke, sized 20–24px, colored navy or teal. Avoid filled/duotone icons and never use emoji as icons. Simple typographic glyphs (`→`, `+`, `›`) are acceptable for inline affordances (links, accordions, breadcrumbs), as used in the UI kits.

> **Flag:** Icon set is a substitution recommendation, not a client-confirmed choice. Confirm before production, and supply any existing brand icons to fold in.

---

## Using the system

Link the stylesheet, then mount components from the compiled bundle:

```html
<link rel="stylesheet" href="styles.css">
<script src="_ds_bundle.js"></script>
<!-- components are exposed on the generated namespace -->
```

All component props are documented in each `components/**/<Name>.d.ts` and `.prompt.md`.

## Caveats / open items
- **Logo:** kraken mark supplied and wired into the lockups + UI kit headers (`assets/kraken-*.png`). Lockups in `guidelines/brand-logo.html`.
- **Photography:** all imagery is placeholder hatching.
- **Icon set:** Lucide is a recommendation pending confirmation.
- **Accent split:** orange = action, teal = energy (chosen for you from "decide for me").
