/**
 * Build-time loader for logo SVG artwork. The source files are single-fill
 * vectors (every path shares one class whose fill lives in an embedded
 * <style> block); stripping the style block and class attributes leaves bare
 * paths that inherit `fill` from an ancestor — which lets a page apply any
 * solid color or gradient via a wrapping <g> or <use fill=…>.
 */
import fs from 'node:fs';
import path from 'node:path';

export interface LogoArt {
  /** The source SVG's viewBox, e.g. "107 0 400 400". */
  viewBox: string;
  /** Inner SVG markup with <style>/<defs>, comments, and class attrs removed. */
  inner: string;
}

/** Load an SVG relative to the project root, e.g. 'src/assets/brand/kraken-navy.svg'. */
export function loadLogoArt(relPath: string): LogoArt {
  const raw = fs.readFileSync(path.join(process.cwd(), relPath), 'utf-8');
  const viewBox = raw.match(/viewBox="([^"]+)"/)?.[1] ?? '0 0 400 400';
  const inner = raw
    .replace(/^[\s\S]*?<svg[^>]*>/, '')
    .replace(/<\/svg>\s*$/, '')
    .replace(/<defs>[\s\S]*?<\/defs>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\s*class="[^"]*"/g, '')
    .trim();
  return { viewBox, inner };
}
