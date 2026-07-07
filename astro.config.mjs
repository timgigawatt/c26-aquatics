import { defineConfig } from 'astro/config';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

/**
 * Lightweight sitemap integration.
 *
 * The pinned `@astrojs/sitemap` (3.7.3) relies on an `astro:routes:resolved`
 * hook that does not exist in Astro 4.16, so the official integration crashes
 * during build. We can't change deps, so we generate a sitemap-index.xml +
 * sitemap-0.xml directly from `astro:build:done`'s `pages` argument.
 */
function inlineSitemap({ changefreq = 'monthly', priority = 0.7 } = {}) {
  return {
    name: 'c26-inline-sitemap',
    hooks: {
      'astro:build:done': async ({ pages, dir, logger }) => {
        const siteUrl = 'https://c26aquatics.com';
        const lastmod = new Date().toISOString();

        const urls = pages
          // Drop status-code pages and private/unlinked pages from sitemap
          .filter((p) => {
            const clean = p.pathname.replace(/\/+$/, '');
            return clean !== '404' && clean !== '500' && clean !== 'variations';
          })
          .map((p) => {
            // Astro emits e.g. "", "team/", "about/", "swim-lessons/"
            const path = p.pathname.startsWith('/') ? p.pathname : `/${p.pathname}`;
            const normalized = path === '/' || path.endsWith('/') ? path : `${path}/`;
            return `${siteUrl}${normalized}`;
          })
          .sort();

        if (urls.length === 0) {
          logger.warn('No pages found; sitemap not written.');
          return;
        }

        const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
        const sitemap0 =
          xmlHeader +
          '\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
          urls
            .map(
              (u) =>
                `  <url>\n    <loc>${u}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`,
            )
            .join('\n') +
          '\n</urlset>\n';
        const sitemapIndex =
          xmlHeader +
          '\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
          `  <sitemap>\n    <loc>${siteUrl}/sitemap-0.xml</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>\n` +
          '</sitemapindex>\n';

        const outDir = fileURLToPath(dir);
        await writeFile(`${outDir}sitemap-0.xml`, sitemap0, 'utf8');
        await writeFile(`${outDir}sitemap-index.xml`, sitemapIndex, 'utf8');
        logger.info(`Wrote sitemap-index.xml + sitemap-0.xml (${urls.length} URLs)`);
      },
    },
  };
}

const integrations = [inlineSitemap({ changefreq: 'monthly', priority: 0.7 })];

export default defineConfig({
  site: 'https://c26aquatics.com',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations,
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
});
