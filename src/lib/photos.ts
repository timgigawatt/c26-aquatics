import fs from 'node:fs';
import path from 'node:path';

const EXTS = ['.jpg', '.jpeg', '.png', '.webp'];

/**
 * Build-time lookup for an optional photo under /public. Pass an
 * extensionless public path ("/photos/founders"); returns the public path of
 * the first matching file, or undefined so callers keep their placeholder.
 * Mirrors the headshot check in CoachesGrid — drop the file in, rebuild, done.
 */
export function publicPhoto(base: string): string | undefined {
  for (const ext of EXTS) {
    const rel = base + ext;
    if (fs.existsSync(path.join(process.cwd(), 'public', rel))) return rel;
  }
  return undefined;
}
