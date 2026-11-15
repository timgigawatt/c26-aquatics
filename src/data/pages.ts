/**
 * The site's pages — one record per route, the single source for each page's <title> and
 * meta description, the sitemap and /llms.txt (src/lib/routes.ts). A page passes
 * `pageMeta('/team')` to Base so the list and the page can never disagree
 * (_config/standards/seo.md: generated from what the build publishes, never hand-written).
 * `file` is the page source, for the sitemap's <lastmod> from git history.
 * /variations (the private logo-review page) and /404 are deliberately not here.
 */
export interface PageMeta {
  route: string;
  title: string;
  description: string;
  file: string;
}

export const PAGES: readonly PageMeta[] = [
  {
    route: '/',
    title: 'C26 Aquatics — Competitive Swim Team in Kansas City',
    description:
      'C26 Aquatics is a Kansas City–metro competitive swim team — one pool, one coaching staff, one standard. USA Swimming–registered training groups from developmental to elite.',
    file: 'src/pages/index.astro',
  },
  {
    route: '/team',
    title: 'Competitive Swim Team | C26 Aquatics',
    description:
      'Train with C26 Aquatics — USA Swimming–registered competitive training groups for KC-metro athletes from developmental to elite. Find your training group.',
    file: 'src/pages/team.astro',
  },
  {
    route: '/our-approach',
    title: 'Our Approach | C26 Aquatics',
    description:
      "How C26 Aquatics develops swimmers — purposeful, periodized training, long-term athlete development, a single home pool, and the Midwest's premier open water program in the Kansas City metro.",
    file: 'src/pages/our-approach.astro',
  },
  {
    route: '/our-story',
    title: 'Our Story | C26 Aquatics',
    description:
      'Why C26 Aquatics exists — founder Robbie Bruce on burnout, the love of the sport, and building a swim team where every swimmer is known, coached, and developed as an individual.',
    file: 'src/pages/our-story.astro',
  },
  {
    route: '/coaches',
    title: 'Our Coaches | C26 Aquatics',
    description:
      'Meet the C26 Aquatics coaching staff — USA Swimming–registered coaches developing competitive and beginner swimmers across the KC metro.',
    file: 'src/pages/coaches.astro',
  },
  {
    route: '/faq',
    title: 'Frequently Asked Questions | C26 Aquatics',
    description:
      'Answers about the C26 Aquatics competitive swim team, evaluations, meets, and logistics across the Kansas City metro — everything KC swim families ask.',
    file: 'src/pages/faq.astro',
  },
  {
    route: '/contact',
    title: 'Contact | C26 Aquatics',
    description:
      'Get in touch with C26 Aquatics — one pool, one coaching staff in south Overland Park. Send us a message and a coach replies within one business day.',
    file: 'src/pages/contact.astro',
  },
] as const;

/** Title + description for a page's <Base>. A route not in PAGES fails the build on purpose. */
export function pageMeta(route: string): { title: string; description: string } {
  const page = PAGES.find((p) => p.route === route);
  if (!page) throw new Error(`src/data/pages.ts has no entry for ${route} — add it so the sitemap and llms.txt list the page`);
  return { title: page.title, description: page.description };
}
