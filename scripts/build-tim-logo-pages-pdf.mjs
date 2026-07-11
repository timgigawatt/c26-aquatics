// Build a clean presentation PDF of the approved teal → indigo → magenta
// gradient logo: one artwork per page, full-bleed background, no labels.
//
// Pages:
//   1. Kraken (gradient) on light
//   2. Wordmark (gradient) on light
//   3. Lockup on light  (gradient kraken + orange/navy wordmark)
//   4. Kraken (gradient) on dark
//   5. Wordmark (gradient) on dark
//   6. Lockup on dark   (gradient kraken + original orange/white wordmark)
//
// Inputs (do not modify):
//   src/assets/brand/kraken-navy.svg   (single-fill kraken paths)
//   public/logo_text_transparent.png   (612x408 RGBA orange/white wordmark)
//
// No light-background wordmark overlay exists in the repo (every transparent
// asset has white letters), so page 3's wordmark is synthesized here: the
// white pixels are recolored to --navy-wordmark (#0a0e26), orange untouched.
//
// Output: docs/downloads/teal-indigo-magenta-logo-pages.pdf
// Run:    node scripts/build-tim-logo-pages-pdf.mjs

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT = path.join(repoRoot, 'docs/downloads/teal-indigo-magenta-logo-pages.pdf');

/* ---- The approved gradient ---- */

const STOPS = [
  { color: '#18bcd0', offset: '0%' },
  { color: '#242b6e', offset: '50%' },
  { color: '#c41e6f', offset: '100%' },
];
const NAVY_WORDMARK = { r: 0x0a, g: 0x0e, b: 0x26 };
const LIGHT_BG = '#ffffff';
const DARK_BG = '#0e1330';

/* ---- Artwork ---- */

// Same stripping as src/lib/logoArt.ts: bare paths inherit fill.
const rawKraken = fs.readFileSync(path.join(repoRoot, 'src/assets/brand/kraken-navy.svg'), 'utf-8');
const viewBox = rawKraken.match(/viewBox="([^"]+)"/)?.[1] ?? '0 0 400 400';
const krakenInner = rawKraken
  .replace(/^[\s\S]*?<svg[^>]*>/, '')
  .replace(/<\/svg>\s*$/, '')
  .replace(/<defs>[\s\S]*?<\/defs>/g, '')
  .replace(/<!--[\s\S]*?-->/g, '')
  .replace(/\s*class="[^"]*"/g, '')
  .trim();

const wordmarkPath = path.join(repoRoot, 'public/logo_text_transparent.png');
const wordmarkUri = `data:image/png;base64,${fs.readFileSync(wordmarkPath).toString('base64')}`;

/** Orange/white wordmark with the white letters recolored to deep navy,
 *  for use over light backgrounds. Orange (low blue channel) is untouched. */
async function navyWordmarkUri() {
  const { data, info } = await sharp(wordmarkPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] > 0 && data[i] > 180 && data[i + 1] > 180 && data[i + 2] > 180) {
      data[i] = NAVY_WORDMARK.r;
      data[i + 1] = NAVY_WORDMARK.g;
      data[i + 2] = NAVY_WORDMARK.b;
    }
  }
  const png = await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toBuffer();
  return `data:image/png;base64,${png.toString('base64')}`;
}

/* ---- Gradient (mirrors /variations: userSpaceOnUse over the viewBox) ---- */

const [vx, vy, vw, vh] = viewBox.split(/\s+/).map(Number);
const svgStops = STOPS.map((s) => `<stop offset="${s.offset}" stop-color="${s.color}"/>`).join('');
const svgGradient = (id) =>
  `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${vx}" y1="${vy}" x2="${vx + vw}" y2="${vy + vh}">${svgStops}</linearGradient>`;
const cssGradient = `linear-gradient(135deg, ${STOPS.map((s) => `${s.color} ${s.offset}`).join(', ')})`;

/* ---- Pages ---- */

const krakenPage = (bg) => `
  <section class="page page--${bg}">
    <svg class="kraken" viewBox="${viewBox}">
      <defs>${svgGradient(`g-kraken-${bg}`)}</defs>
      <use href="#art-kraken" fill="url(#g-kraken-${bg})"/>
    </svg>
  </section>`;

const wordmarkPage = (bg) => `
  <section class="page page--${bg}">
    <div class="wordmark" style="background-image:${cssGradient}"></div>
  </section>`;

const lockupPage = (bg, overlayUri) => `
  <section class="page page--${bg}">
    <div class="lockup">
      <svg class="lockup__kraken" viewBox="${viewBox}">
        <defs>${svgGradient(`g-lockup-${bg}`)}</defs>
        <use href="#art-kraken" fill="url(#g-lockup-${bg})"/>
      </svg>
      <img class="lockup__wordmark" src="${overlayUri}" alt=""/>
    </div>
  </section>`;

const lightWordmarkUri = await navyWordmarkUri();

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>C26 Aquatics — Teal → Indigo → Magenta</title>
<style>
  @page { size: Letter landscape; margin: 0; }
  * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { margin: 0; }

  .page {
    width: 11in;
    height: 8.5in;
    page-break-after: always;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .page:last-child { page-break-after: auto; }
  .page--light { background: ${LIGHT_BG}; }
  .page--dark { background: ${DARK_BG}; }

  .kraken { height: 6.8in; width: auto; display: block; }

  .wordmark {
    height: 4.4in;
    aspect-ratio: 612 / 408;
    background-size: 100% 100%;
    -webkit-mask-image: url('${wordmarkUri}');
    mask-image: url('${wordmarkUri}');
    -webkit-mask-size: contain;
    mask-size: contain;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-position: center;
    mask-position: center;
  }

  /* Composed lockup: gradient kraken behind, wordmark centered at 74%
     height at 92% width (same geometry as /variations). */
  .lockup { position: relative; height: 7.6in; aspect-ratio: 294 / 372; }
  .lockup__kraken { position: absolute; inset: 0; width: 100%; height: 100%; }
  .lockup__wordmark {
    position: absolute;
    left: 50%;
    top: 74%;
    transform: translate(-50%, -50%);
    width: 92%;
    height: auto;
  }
</style>
</head>
<body>
<svg width="0" height="0" style="position:absolute">
  <g id="art-kraken">${krakenInner}</g>
</svg>
${krakenPage('light')}
${wordmarkPage('light')}
${lockupPage('light', lightWordmarkUri)}
${krakenPage('dark')}
${wordmarkPage('dark')}
${lockupPage('dark', wordmarkUri)}
</body>
</html>`;

/* ---- Print ---- */

const tmpHtml = path.join(os.tmpdir(), 'c26-tim-logo-pages.html');
fs.writeFileSync(tmpHtml, html);
fs.mkdirSync(path.dirname(OUT), { recursive: true });

execFileSync(CHROME, [
  '--headless',
  '--disable-gpu',
  '--no-pdf-header-footer',
  `--print-to-pdf=${OUT}`,
  `file://${tmpHtml}`,
]);

console.log(`Wrote ${path.relative(repoRoot, OUT)} (6 pages)`);
