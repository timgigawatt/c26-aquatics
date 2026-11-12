import type { APIRoute } from 'astro';

// Allow everything, name the sitemap (astro.config.mjs writes /sitemap-index.xml). AI crawlers
// (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended…) are allowed on purpose:
// being cited by an answer engine is how a small business gets found now, and tools/seo.mjs
// fails a build that blocks one (_config/standards/seo.md). Generated from Astro.site, never
// hand-typed. Branch deploys are kept out by the noindex meta, not here.
export const GET: APIRoute = ({ site }) => {
  const base = site!.href.replace(/\/$/, '');
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap-index.xml\n`, { headers: { 'Content-Type': 'text/plain' } });
};
