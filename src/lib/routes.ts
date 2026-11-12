// Every indexable route of this build, with title, description and last-modified — one list
// that the sitemap (astro.config.mjs) and /llms.txt both read, so the two never disagree
// (_config/standards/seo.md). The pages are static .astro files, so the list is
// src/data/pages.ts, which each page also reads for its own title and description.
import { PAGES } from '../data/pages';
import { lastmod } from './lastmod';

export type Route = { route: string; title: string; description: string; lastmod?: string };

export function siteRoutes(): Route[] {
  return PAGES.map((p) => ({ route: p.route === '/' ? '/' : `${p.route}/`, title: p.title, description: p.description, lastmod: lastmod(p.file) }));
}
