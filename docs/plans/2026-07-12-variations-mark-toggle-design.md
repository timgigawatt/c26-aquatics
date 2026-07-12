# Variations page: Option 1 / Option 2 mark toggle

**Date:** 2026-07-12
**Page:** `src/pages/variations.astro`
**New assets:** `public/option_1.svg`, `public/option_2.svg`

## Goal

Let the client choose between two new kraken marks on the `/variations` review
page. The page keeps its current layout (composed lockup + five gradient
variations), but every kraken-bearing tile can show either mark. The current
mark (`logo_bg_transparent_5.svg`) retires from this page — the choice is a
two-way Option 1 / Option 2.

## Toggle mechanics

- A segmented **Option 1 / Option 2** control is pinned at the top of the page.
- Both marks are emitted once each as hidden defs (`#art-kraken-o1`,
  `#art-kraken-o2`), referenced per tile via `<use>` — same pattern as today's
  single hidden `<g>`.
- Each kraken tile (and each lockup tile) renders **two** `<svg>` elements, one
  per option. Each carries its own `viewBox` and its own `userSpaceOnUse`
  gradient line, because the two files live in different coordinate spaces
  (612×792 vs 612×1034, both cropped to measured artwork bounds).
- Visibility is pure CSS: `<main data-option="1">` shows `.art--o1` and hides
  `.art--o2`; the toggle flips the attribute with ~5 lines of inline script.
  No flash, no JS re-plumbing of `href`/`viewBox`/gradients; the page defaults
  to Option 1 if script fails.
- Wordmark-only tiles are mark-independent and stay single.
- The intro copy tells the client to use the toggle and reply with a mark
  option **and** a gradient number.

## Loader changes (`src/lib/logoArt.ts`)

`loadLogoArt()` gains one step: after stripping `<defs>` and comments, remove
`<image …/>` elements (both self-closing and paired forms) **before** stripping
classes.

Why: `option_1.svg` contains two hidden Illustrator layers (`class="st4"` →
`display:none`) holding embedded raster images (~1.4MB). The existing
class-stripping would delete the `display:none` and make those rasters visible
— and inline 1.4MB into the page HTML. Removing `<image>` elements first
deletes both problems; the now-empty wrapper `<g>` groups are harmless.
`option_2.svg` (241 bare paths, no classes/fills) passes through untouched.

## Asset nuances

- **option_1 fills:** visible paths carry two near-black fills via classes
  (`st0` = `#010101`, `st1` = `#231f20`). Class-stripping flattens this to one
  inherited fill, which is what gradient treatment needs. Eyeball the rendered
  result; if the two tones turn out to be a deliberate two-tone design,
  revisit.
- **Cropped viewBoxes:** measure each option's artwork bounds the same way as
  the current mark (render, `getBBox()`, small margin) and hard-code them in
  the frontmatter with a comment, matching the existing pattern.
- **Lockup placement:** keep the wordmark PNG overlay at `top: 74%` / 92%
  width; if either new mark's proportions make that look off, give that
  option's lockup its own offset constant.

## Untouched

Gradient stop data, tile CSS, section markup, wordmark masking — all unchanged.
