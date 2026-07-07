# Logo variations page — design

**Date:** 2026-07-06
**Status:** Approved

## Purpose

A private, unlinked page at `/variations/` that showcases gradient color
explorations of the C26 logo for client review. Not in the nav, footer, or
any internal link; `noindex, nofollow` robots meta. Shared by URL only.

## The variations

Five gradient takes on the magenta / teal / indigo brand triad, built from
the site's own tokens so they are honest previews:

| # | Name | Stops | Notes |
|---|------|-------|-------|
| 1 | Magenta → Teal → Indigo | `#c41e6f` → `#18bcd0` → `#242b6e` | The requested direction; diagonal |
| 2 | Indigo → Magenta → Teal | `#242b6e` → `#c41e6f` → `#18bcd0` | Reordered stops, same angle |
| 3 | Teal → Indigo → Magenta | `#18bcd0` → `#242b6e` → `#c41e6f` | Third rotation of the stop order |
| 4 | Vivid | `#ff2d8f` → `#2fd0e0` → `#4550c9` | Saturated/brightened for punch |
| 5 | Subtle | `#a84d7e` → `#4d9fae` → `#3d4378` | Desaturated, compressed stops (20/50/80) |

All gradients run diagonally (top-left → bottom-right).

## Layout

One card per variation. Each card:

- Header: variation number, name, and the hex stops (so the client can say
  "we like #3" unambiguously), plus a one-line note.
- A 2×2 tile grid: **kraken icon** and **wordmark**, each shown on a
  light tile and a navy (`--navy-900`) tile — gradients read very
  differently on dark.

Minimal page chrome: simple heading, no Header/Footer components.

## Implementation

- **`src/lib/logoArt.ts`** — build-time helper. Reads an SVG with
  `fs.readFileSync`, strips the embedded `<style>` block and `class`
  attributes (the source SVGs are single-fill via `.st0`), returns
  `{ viewBox, inner }`. Bare paths then inherit `fill` from an ancestor.
- **Artwork sources:** `src/assets/brand/kraken-navy.svg` (icon, viewBox
  `107 0 400 400`) and `public/logo_text_transparent.png` (wordmark).
- **Page weight:** each SVG is ~33KB of paths. The paths are emitted once
  each inside a hidden zero-size `<svg>` as `<g id="art-kraken">` /
  `<g id="art-lockup">`; every tile is a small
  `<svg viewBox=…><defs><linearGradient/></defs><use href="#art-…"
  fill="url(#…)"/></svg>`.
- **Gradient units:** `gradientUnits="userSpaceOnUse"` with coordinates
  spanning the artwork's viewBox. The default `objectBoundingBox` would
  scale the gradient to each *path's* own bounding box, giving every
  tentacle its own full gradient — wrong for a multi-path logo.
- **Unique gradient ids** per variation × artwork (5 × 2 = 10 tiny defs).
- **noindex:** `<meta name="robots" content="noindex, nofollow" />` via
  Base's `head` slot.

## Known caveats

- **No mark+text lockup asset exists.** Every "text" file in the repo
  (`logo_text*.png`, `wordmark-*.png`) is the wordmark alone, and
  `logo_bg_transparent.svg` — despite its 270 paths — is just a more
  detailed cut of the kraken, no letterforms. The page therefore shows the
  kraken (vector, SVG gradient) and the wordmark. As a raster, the wordmark
  gets its gradient via CSS `mask-image` over the transparent PNG's alpha
  channel — same 135° angle and stops as the SVG gradients.
- The gradient replaces the wordmark's usual two-tone orange/white in
  these previews — called out to the client on the page.
