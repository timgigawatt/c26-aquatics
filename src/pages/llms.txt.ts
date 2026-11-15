import type { APIRoute } from 'astro';
import { site as SITE } from '../data/site';
import { serviceArea } from '../data/serviceArea';
import { siteRoutes } from '../lib/routes';

// /llms.txt — the site in the form AI crawlers and answer engines read first
// (https://llmstxt.org): one H1, a one-paragraph summary, then every page with its
// description, then the facts an answer would cite. Generated from src/data/pages.ts and
// src/data/site.ts — the same sources as the pages and the JSON-LD — so it can't drift from
// the site. It replaced a hand-written public/llms.txt on 2026-11-12 (_config/standards/seo.md).
export const GET: APIRoute = ({ site }) => {
  const base = (site?.href ?? SITE.url).replace(/\/$/, '');
  const a = SITE.address;
  const summary = `${SITE.description} Home pool at ${SITE.place.venue} in ${a.addressLocality}, ${a.addressRegion}. Serving ${serviceArea.map((c) => c.name).join(', ')}.`;
  const L: string[] = [`# ${SITE.name}`, '', `> ${summary}`, '', '## Pages', ''];
  for (const r of siteRoutes()) L.push(`- [${r.title.replace(/\s*[|—]\s*C26 Aquatics.*$/, '').replace(/^C26 Aquatics — /, '')}](${base}${r.route}): ${r.description}`);
  L.push('', '## How to join', '', `New swimmers start with a team evaluation and placement, booked through Momence: ${SITE.booking.team}`);
  L.push('', '## Contact', '', `- Phone: ${SITE.contact.phoneDisplay}`, `- Email: ${SITE.contact.email}`, `- Address: ${a.streetAddress}, ${a.addressLocality}, ${a.addressRegion} ${a.postalCode}`,
    ...Object.values(SITE.social).filter(Boolean).map((u) => `- Profile: ${u}`), `- Team store: ${SITE.store}`);
  return new Response(L.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
