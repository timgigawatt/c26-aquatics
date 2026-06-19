// Build brand imagery: OG card, favicon, and apple-touch-icon.
//
// Inputs (do not modify):
//   src/assets/brand/kraken-white.png   (400x400 RGBA, white kraken silhouette)
//   src/assets/brand/wordmark-navy.png  (1536x1024 RGB, "C26 AQUATICS" on #021c36)
//
// Outputs:
//   public/og-default.png       (1200x630 PNG, default Open Graph card)
//   public/favicon.png          (32x32 PNG, white kraken on #021c36)
//   public/apple-touch-icon.png (180x180 PNG, white kraken on #021c36, inset)
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

const KRAKEN_WHITE = path.join(BRAND_DIR, 'kraken-white.png');
const WORDMARK = path.join(BRAND_DIR, 'wordmark-navy.png');

// Navy that matches the wordmark's solid background. This lets the wordmark
// composite seamlessly onto our canvas without a visible rectangle edge.
const NAVY = { r: 0x02, g: 0x1c, b: 0x36, alpha: 1 };

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function buildOgCard() {
  const W = 1200;
  const H = 630;

  // Stacked lockup: kraken sits in the top half, wordmark in the bottom half.
  const krakenSize = 280;
  const kraken = await sharp(KRAKEN_WHITE)
    .resize(krakenSize, krakenSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  // Trim the solid navy padding around the wordmark so it composites cleanly
  // onto the navy canvas with no visible rectangle seam.
  const wordmarkTargetWidth = 720;
  const wordmark = await sharp(WORDMARK)
    .trim({ background: { r: 0x02, g: 0x1c, b: 0x36 }, threshold: 20 })
    .resize({ width: wordmarkTargetWidth })
    .png()
    .toBuffer();

  const wordmarkMeta = await sharp(wordmark).metadata();

  const krakenLeft = Math.round((W - krakenSize) / 2);
  const krakenTop = Math.round((H / 2 - krakenSize) / 2);
  const wordmarkLeft = Math.round((W - wordmarkMeta.width) / 2);
  const wordmarkTop = Math.round(H / 2 + (H / 2 - wordmarkMeta.height) / 2);

  const canvas = sharp({
    create: {
      width: W,
      height: H,
      channels: 4,
      background: NAVY
    }
  });

  const out = path.join(PUBLIC_DIR, 'og-default.png');
  await canvas
    .composite([
      { input: kraken, left: krakenLeft, top: krakenTop },
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
  const kraken = await sharp(KRAKEN_WHITE)
    .resize(krakenPx, krakenPx, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const offset = Math.round((size - krakenPx) / 2);

  const out = path.join(PUBLIC_DIR, outName);
  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: NAVY
    }
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
