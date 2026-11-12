// Last-modified dates for sitemap <lastmod> and llms.txt. An explicit `updated` on the
// entry wins; otherwise the last commit that touched the file, when the clone has history.
// Netlify builds from a shallow clone with one commit, where every file would read as
// "changed today" — there we say nothing. A missing lastmod is honest; a wrong one teaches
// crawlers to ignore the field.
import { execSync } from 'node:child_process';

let deep: boolean | null = null;
const cache = new Map<string, string | undefined>();
const git = (args: string) => { try { return execSync(`git ${args}`, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(); } catch { return ''; } };

export function lastmod(relPath: string): string | undefined {
  if (deep === null) deep = git('rev-parse --is-shallow-repository') === 'false' && git('rev-list --count HEAD') !== '1';
  if (!deep) return undefined;
  if (!cache.has(relPath)) { const d = git(`log -1 --format=%cI -- "${relPath}"`); cache.set(relPath, d ? d.slice(0, 10) : undefined); }
  return cache.get(relPath);
}

// Never in the future: a scheduled post's pubDate is when it will publish, not when it changed.
export const isoDay = (d?: Date | string | null) => { if (!d) return undefined; const t = Math.min(new Date(d).getTime(), Date.now()); return new Date(t).toISOString().slice(0, 10); };
