# Variations page: retire options 2/3, add the kids mark

Port the evolved `/variations` page from the gigawatt_lab c26 repo
(`~/data/gigawatt_lab/development/c26`), where this work is already done and
committed (`11a98a8`, `1b83e71`). Option 1 is the chosen kraken mark; options
2 and 3 are retired, and the kids kraken joins the page as a second mark.

## Approach

Copy, don't re-derive. The other repo's `src/pages/variations.astro` is a
strict evolution of this repo's page (same `loadLogoArt` lib, same tokens,
same Base layout), so it is copied verbatim. It already:

- Replaces the Option 1/2/3 toggle with a **Kraken / Kids** toggle,
  defaulting to Kraken (option 1).
- Renders the kids mark (`brand/kraken_kids_bw.svg`) through the same
  gradient pipeline as the main mark.
- Composes the kids lockup by overlaying the outlined KRAKEN KIDS type
  (`kraken_kids_text.svg`, orange + white) beneath the mark — pre-measured
  viewBox math we do not want to redo.

## Files

| From gigawatt_lab c26 | To here |
| --- | --- |
| `src/pages/variations.astro` | same path (overwrite) |
| `brand/kraken_kids_bw.svg` | `brand/` (new dir) |
| `brand/kraken_kids_text.svg` | `brand/` |
| `public/downloads/brand/kids-kraken-{light,dark,transparent}.png`, `kids-kraken-gradient.svg` | `public/downloads/brand/` (new dir) |

`brand/` sits at the repo root (matching the other repo) rather than in
`public/` — the page reads the SVGs at build time via `fs`, so they need not
be served, and the path match means zero edits to the ported page.

Cleanup: delete `public/option_2.svg` and `public/option_3.svg` — the
variations page was their only consumer.

## Verification

- `npm run build` — the build-time `fs` reads fail loudly on a bad path.
- Visual check of `/variations`: default Kraken, Kids toggle shows mark +
  KRAKEN KIDS type in lockup tiles, five gradients render on both.
- The four kids download files land in `dist/downloads/brand/`.

## Not doing

- Not copying `kraken_kids.svg` / `kraken_kids_2.svg` (untracked working
  files) — the page only needs `_bw` and `_text`.
- Not linking `/variations` or the downloads from nav; the page stays
  unlisted and noindexed.
- Not copying the main-mark download set (kids files only, per client).
