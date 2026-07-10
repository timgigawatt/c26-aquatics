// Build a client-review PDF of gradient variations that all keep the
// approved teal → indigo → magenta stop order, varying tone, stop
// position, and angle.
//
// Inputs (do not modify):
//   src/assets/brand/kraken-navy.svg   (single-fill kraken paths)
//   public/logo_text_transparent.png   (612x408 RGBA orange/white wordmark)
//
// Output:
//   docs/downloads/teal-indigo-magenta-variations.pdf
//
// Each variation gets one landscape Letter page: header with name, note,
// and hex stops, then five tiles — kraken and wordmark on light and dark,
// plus the composed lockup on dark (mirroring the /variations page).
//
// Run: node scripts/build-tim-variations-pdf.mjs

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT = path.join(repoRoot, 'docs/downloads/teal-indigo-magenta-variations.pdf');

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

const wordmarkUri = `data:image/png;base64,${fs
  .readFileSync(path.join(repoRoot, 'public/logo_text_transparent.png'))
  .toString('base64')}`;

/* ---- Variations: teal → indigo → magenta, always in that order ---- */

const BRAND = ['#18bcd0', '#242b6e', '#c41e6f'];

const variations = [
  {
    slug: 'brand',
    name: 'Brand (approved)',
    note: 'The approved gradient as the reference point — brand cyan into base indigo, finishing on brand magenta. Diagonal.',
    colors: BRAND,
    offsets: ['0%', '50%', '100%'],
    angle: 'diagonal',
  },
  {
    slug: 'vivid',
    name: 'Vivid',
    note: 'Saturated, brightened stops for a punchier, sportier read.',
    colors: ['#2fd0e0', '#4550c9', '#ff2d8f'],
    offsets: ['0%', '50%', '100%'],
    angle: 'diagonal',
  },
  {
    slug: 'subtle',
    name: 'Subtle',
    note: 'Desaturated stops compressed toward the middle for a quieter, more corporate feel.',
    colors: ['#4d9fae', '#3d4378', '#a84d7e'],
    offsets: ['20%', '50%', '80%'],
    angle: 'diagonal',
  },
  {
    slug: 'deep',
    name: 'Deep',
    note: 'Darker cuts of all three stops — richer and more premium, reads well at small sizes.',
    colors: ['#0e96a8', '#161a40', '#a3195c'],
    offsets: ['0%', '50%', '100%'],
    angle: 'diagonal',
  },
  {
    slug: 'bright',
    name: 'Bright',
    note: 'Lighter cuts — bright cyan and on-dark magenta around a mid indigo. Friendlier, more youthful.',
    colors: ['#2fd0e0', '#3f4ba0', '#e3267e'],
    offsets: ['0%', '50%', '100%'],
    angle: 'diagonal',
  },
  {
    slug: 'teal-forward',
    name: 'Teal-forward',
    note: 'Brand stops with the indigo pushed late — teal carries most of the mark, magenta becomes an accent.',
    colors: BRAND,
    offsets: ['0%', '68%', '100%'],
    angle: 'diagonal',
  },
  {
    slug: 'magenta-forward',
    name: 'Magenta-forward',
    note: 'Brand stops with the indigo pulled early — magenta carries most of the mark, teal becomes an accent.',
    colors: BRAND,
    offsets: ['0%', '32%', '100%'],
    angle: 'diagonal',
  },
  {
    slug: 'vertical',
    name: 'Vertical',
    note: 'The approved stops running straight top-to-bottom instead of diagonally.',
    colors: BRAND,
    offsets: ['0%', '50%', '100%'],
    angle: 'vertical',
  },
];

/* ---- Gradient helpers (mirror /variations: userSpaceOnUse over the viewBox) ---- */

const [vx, vy, vw, vh] = viewBox.split(/\s+/).map(Number);

function gradientLine(angle) {
  return angle === 'vertical'
    ? { x1: vx, y1: vy, x2: vx, y2: vy + vh }
    : { x1: vx, y1: vy, x2: vx + vw, y2: vy + vh };
}

function svgGradient(id, v) {
  const l = gradientLine(v.angle);
  const stops = v.colors
    .map((c, i) => `<stop offset="${v.offsets[i]}" stop-color="${c}"/>`)
    .join('');
  return `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${l.x1}" y1="${l.y1}" x2="${l.x2}" y2="${l.y2}">${stops}</linearGradient>`;
}

function cssGradient(v) {
  const deg = v.angle === 'vertical' ? 180 : 135;
  return `linear-gradient(${deg}deg, ${v.colors.map((c, i) => `${c} ${v.offsets[i]}`).join(', ')})`;
}

/* ---- HTML ---- */

const krakenTile = (v, bg) => `
  <figure class="tile tile--${bg}">
    <svg class="tile__art" viewBox="${viewBox}">
      <defs>${svgGradient(`g-${v.slug}-${bg}`, v)}</defs>
      <use href="#art-kraken" fill="url(#g-${v.slug}-${bg})"/>
    </svg>
    <figcaption class="tile__label">Kraken &middot; ${bg}</figcaption>
  </figure>`;

const wordmarkTile = (v, bg) => `
  <figure class="tile tile--${bg}">
    <div class="tile__wordmark" style="background-image:${cssGradient(v)}"></div>
    <figcaption class="tile__label">Wordmark &middot; ${bg}</figcaption>
  </figure>`;

const lockupTile = (v) => `
  <figure class="tile tile--dark">
    <div class="lockup">
      <svg class="lockup__kraken" viewBox="${viewBox}">
        <defs>${svgGradient(`g-${v.slug}-lockup`, v)}</defs>
        <use href="#art-kraken" fill="url(#g-${v.slug}-lockup)"/>
      </svg>
      <img class="lockup__wordmark" src="${wordmarkUri}" alt=""/>
    </div>
    <figcaption class="tile__label">Lockup &middot; dark</figcaption>
  </figure>`;

const pages = variations
  .map(
    (v, i) => `
  <section class="page">
    <header class="page__head">
      <p class="eyebrow">C26 Aquatics &middot; Teal &rarr; Indigo &rarr; Magenta &middot; For review</p>
      <h1 class="name"><span class="num">${String(i + 1).padStart(2, '0')}</span> ${v.name}</h1>
      <p class="note">${v.note}</p>
      <p class="stops">${v.colors
        .map(
          (c, j) =>
            `<span class="stop"><span class="swatch" style="background:${c}"></span>${c} @ ${v.offsets[j]}</span>`,
        )
        .join('')}</p>
    </header>
    <div class="grid">
      ${krakenTile(v, 'light')}
      ${wordmarkTile(v, 'light')}
      ${krakenTile(v, 'dark')}
      ${wordmarkTile(v, 'dark')}
      ${lockupTile(v)}
    </div>
  </section>`,
  )
  .join('\n');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>C26 Aquatics — Teal → Indigo → Magenta variations</title>
<style>
  @page { size: Letter landscape; margin: 0; }
  * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { margin: 0; font-family: "Helvetica Neue", Arial, sans-serif; color: #15262f; }

  .page {
    width: 11in;
    height: 8.5in;
    padding: 0.55in 0.6in;
    page-break-after: always;
    background: #f6f9fa;
    display: flex;
    flex-direction: column;
  }
  .page:last-child { page-break-after: auto; }

  .eyebrow {
    margin: 0 0 6px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #0e96a8;
  }
  .name {
    margin: 0 0 8px;
    font-size: 30px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: -0.01em;
    color: #242b6e;
  }
  .num { color: #18bcd0; margin-right: 6px; }
  .note { margin: 0 0 10px; font-size: 13px; line-height: 1.5; color: #2c3f49; max-width: 7.5in; }
  .stops { margin: 0; display: flex; gap: 18px; font-family: Menlo, monospace; font-size: 11px; color: #5d7480; }
  .stop { display: inline-flex; align-items: center; gap: 6px; }
  .swatch { width: 12px; height: 12px; border-radius: 3px; border: 1px solid #d7e0e5; display: inline-block; }

  /* Five tiles as 3 + 2, the second row centered — keeps the artwork large
     on a landscape page instead of five skinny columns. */
  .grid {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 1fr 1fr;
    gap: 0.18in;
    margin-top: 0.25in;
    align-items: stretch;
  }
  .tile { grid-column: span 2; }
  .tile:nth-of-type(4) { grid-column: 2 / span 2; }
  .tile:nth-of-type(5) { grid-column: 4 / span 2; }
  .tile {
    margin: 0;
    border-radius: 10px;
    padding: 0.22in 0.18in;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  .tile--light { background: #ffffff; border: 1px solid #d7e0e5; }
  .tile--dark { background: #0e1330; }
  .tile__art { height: 1.8in; width: auto; max-width: 100%; display: block; }
  .tile__wordmark {
    height: 1.45in;
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
  .lockup { position: relative; height: 1.9in; aspect-ratio: 1 / 1; }
  .lockup__kraken { position: absolute; inset: 0; width: 100%; height: 100%; }
  .lockup__wordmark {
    position: absolute;
    left: 50%;
    top: 66.7%;
    transform: translate(-50%, -50%);
    width: 82%;
    height: auto;
  }
  .tile__label {
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #5d7480;
  }
  .tile--dark .tile__label { color: #2fd0e0; }
</style>
</head>
<body>
<svg width="0" height="0" style="position:absolute">
  <g id="art-kraken">${krakenInner}</g>
</svg>
${pages}
</body>
</html>`;

/* ---- Print ---- */

const tmpHtml = path.join(os.tmpdir(), 'c26-tim-variations.html');
fs.writeFileSync(tmpHtml, html);
fs.mkdirSync(path.dirname(OUT), { recursive: true });

execFileSync(CHROME, [
  '--headless',
  '--disable-gpu',
  '--no-pdf-header-footer',
  `--print-to-pdf=${OUT}`,
  `file://${tmpHtml}`,
]);

console.log(`Wrote ${path.relative(repoRoot, OUT)} (${variations.length} pages)`);
