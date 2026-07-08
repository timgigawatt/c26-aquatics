// Build brand imagery: OG card, favicon, and apple-touch-icon.
//
// Inputs (do not modify):
//   src/assets/brand/kraken-gradient.svg  (kraken with the approved teal →
//                                          indigo → magenta gradient baked in)
//   src/assets/brand/kraken-white.svg     (white kraken, used for the icons)
//   public/logo_text_transparent.png      (612x408 RGBA orange/white wordmark)
//
// Outputs:
//   public/og-default.png       (1200x630 PNG — the "Lockup · dark" from
//                                /variations: gradient kraken on navy-900,
//                                wordmark overlaid at two-thirds height)
//   public/favicon.png          (32x32 PNG, white kraken on navy)
//   public/apple-touch-icon.png (180x180 PNG, white kraken on navy, inset)
//
// Run: npm run build:og

import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const BRAND_DIR = path.join(repoRoot, 'src/assets/brand');
const PUBLIC_DIR = path.join(repoRoot, 'public');

const KRAKEN_GRADIENT = path.join(BRAND_DIR, 'kraken-gradient.svg');
const KRAKEN_WHITE = path.join(BRAND_DIR, 'kraken-white.svg');
const WORDMARK = path.join(PUBLIC_DIR, 'logo_text_transparent.png');

// navy-900 — the "Lockup · dark" tile background from /variations.
const NAVY = { r: 0x0e, g: 0x13, b: 0x30, alpha: 1 };

/** Rasterize an SVG at `size` px square. The sources are 400px; density
 *  scales librsvg's render so we never upscale a soft bitmap. */
async function renderSvg(file, size) {
  return sharp(file, { density: Math.ceil((72 * size) / 400) })
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function buildOgCard() {
  const W = 1200;
  const H = 630;

  // The composed lockup from /variations, centered on the card: a square
  // gradient kraken with the wordmark overlaid at 82% width, its center
  // sitting at two-thirds of the lockup's height.
  const LOCKUP = 560;
  const lockupLeft = Math.round((W - LOCKUP) / 2);
  const lockupTop = Math.round((H - LOCKUP) / 2);

  const kraken = await renderSvg(KRAKEN_GRADIENT, LOCKUP);

  const wordmarkWidth = Math.round(LOCKUP * 0.82);
  const wordmark = await sharp(WORDMARK)
    .resize({ width: wordmarkWidth })
    .png()
    .toBuffer();
  const wordmarkMeta = await sharp(wordmark).metadata();

  const wordmarkLeft = Math.round((W - wordmarkMeta.width) / 2);
  const wordmarkTop = Math.round(lockupTop + LOCKUP * 0.667 - wordmarkMeta.height / 2);

  const out = path.join(PUBLIC_DIR, 'og-default.png');
  await sharp({
    create: { width: W, height: H, channels: 4, background: NAVY }
  })
    .composite([
      { input: kraken, left: lockupLeft, top: lockupTop },
      { input: wordmark, left: wordmarkLeft, top: wordmarkTop }
    ])
    .png()
    .toFile(out);

  const meta = await sharp(out).metadata();
  console.log(`  og-default.png        ${meta.width}x${meta.height}`);
}

async function buildIcon({ outName, size, krakenScale }) {
  // White kraken centered on navy square, with `krakenScale` of the canvas
  // size devoted to the kraken (rest is padding).
  const krakenPx = Math.round(size * krakenScale);
  const kraken = await renderSvg(KRAKEN_WHITE, krakenPx);
  const offset = Math.round((size - krakenPx) / 2);

  const out = path.join(PUBLIC_DIR, outName);
  await sharp({
    create: { width: size, height: size, channels: 4, background: NAVY }
  })
    .composite([{ input: kraken, left: offset, top: offset }])
    .png()
    .toFile(out);

  const meta = await sharp(out).metadata();
  console.log(`  ${outName.padEnd(22)}${meta.width}x${meta.height}`);
}

async function main() {
  await ensureDir(PUBLIC_DIR);
  console.log('Building brand imagery:');
  await buildOgCard();
  // 32x32 favicon: kraken nearly fills, minor padding for crispness.
  await buildIcon({ outName: 'favicon.png', size: 32, krakenScale: 0.88 });
  // 180x180 apple-touch-icon: more inset so the silhouette breathes inside
  // the rounded-square iOS treatment.
  await buildIcon({ outName: 'apple-touch-icon.png', size: 180, krakenScale: 0.76 });
  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
