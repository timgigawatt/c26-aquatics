/**
 * Build-time content reader. Content is files in this repo — exported from the
 * Payload CMS (tenant c26) on 2026-09-18 and edited here since:
 *
 *   src/content/pages/<slug>.json          page docs (title, slug, seo, layout[], published)
 *   src/content/programs/*.json            programs (sorted by order)
 *   src/content/team-members/*.json        team
 *   src/content/announcements/*.json       announcements
 *   src/content/globals/{navigation,footer,seo-settings}.json
 *   public/media/*                         every referenced media file (+ size variants)
 *
 * Types are the CMS doc shapes, unchanged, so every component keeps working.
 * Unpublished pages are hidden in production only (Netlify CONTEXT=production).
 */

// --- Types (the fields this site actually consumes) -------------------------

export interface CmsMedia {
  id: number;
  url: string;
  alt: string;
  filename: string;
}

export interface CmsButton {
  label: string;
  href: string;
  style?: 'accent' | 'paper' | 'ink';
}

/** A layout block. blockType discriminates; fields vary per block. */
export interface CmsBlock {
  blockType: string;
  [key: string]: unknown;
}

export interface CmsPage {
  id: number;
  title: string;
  slug: string;
  layout: CmsBlock[];
  seo?: { title?: string; description?: string };
}

export interface CmsProgram {
  name: string;
  slug: string;
  order: number;
  ageRange?: string;
  groupSize?: number;
  commitmentLevel?: 'developmental' | 'competitive' | 'elite';
  suggestedPractices?: string;
  monthlyHours?: number;
  monthlyCost?: number;
  costPerHour?: number;
  scheduleOptions?: { label?: string; slots: { day: string; time: string }[] }[];
  prerequisites?: { text: string }[];
  evaluationStandards?: { text: string }[];
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export interface CmsTeamMember {
  name: string;
  slug: string;
  role?: string;
  group?: string;
  order?: number;
  showInTeam?: boolean;
  headshot?: CmsMedia | null;
  summary?: string;
  bio?: string;
  specialties?: { label: string }[];
  sections?: {
    heading: string;
    display: 'text' | 'list' | 'pills' | 'highlights';
    body?: string;
    items?: { text: string; link?: string }[];
  }[];
}

export interface CmsAnnouncement {
  title: string;
  body?: string;
  image?: CmsMedia | null;
  startDate: string;
  endDate: string;
  draft: boolean;
}

export interface CmsNavItem {
  label: string;
  href: string;
  children?: CmsNavItem[];
}

export interface CmsFooter {
  columns?: { heading?: string; links: { label: string; href: string }[] }[];
  social?: { platform: string; href: string }[];
  legal?: { label: string; href: string }[];
  contact?: { phone?: string; email?: string; address?: string };
  copyright?: string;
}

export interface CmsSeoSettings {
  titleTemplate?: string;
  defaultTitle?: string;
  defaultDescription?: string;
}

// --- Fetch -------------------------------------------------------------------

// --- Reading --------------------------------------------------------------

const files = import.meta.glob<{ default: unknown }>('/src/content/**/*.json', { eager: true });

const docs = <T>(collection: string): T[] =>
  Object.entries(files)
    .filter(([path]) => path.startsWith(`/src/content/${collection}/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, mod]) => mod.default as T);

const global = <T>(name: string): T | null =>
  (files[`/src/content/globals/${name}.json`]?.default as T) ?? null;

const byOrder = <T extends { order?: number }>(a: T, b: T) => (a.order ?? 0) - (b.order ?? 0);
const isProduction = process.env.CONTEXT === 'production';

export const getPages = async () =>
  docs<CmsPage & { published?: boolean }>('pages').filter((p) => !isProduction || p.published !== false);

export const getPage = async (slug: string) => {
  const page = (await getPages()).find((p) => p.slug === slug);
  if (!page) throw new Error(`No src/content/pages/${slug}.json (or it is unpublished).`);
  return page;
};

export const getPrograms = async () => docs<CmsProgram>('programs').sort(byOrder);

export const getTeamMembers = async () =>
  docs<CmsTeamMember>('team-members').sort(byOrder).filter((m) => m.showInTeam !== false);

export const getAnnouncements = async () =>
  docs<CmsAnnouncement>('announcements').sort((a, b) => Date.parse(b.startDate) - Date.parse(a.startDate));

export const getNavigation = async () => global<{ items?: CmsNavItem[] }>('navigation')?.items ?? [];

export const getFooter = async () => global<CmsFooter>('footer') ?? ({} as CmsFooter);

export const getSeoSettings = async () => global<CmsSeoSettings>('seo-settings') ?? ({} as CmsSeoSettings);

/** Media urls are site-relative (/media/<file>) — served from public/media. */
export const mediaUrl = (media?: CmsMedia | null) => media?.url || undefined;

/** First paragraph of a blank-line-separated body (program card taglines). */
export const firstParagraph = (body?: string) => body?.split(/\n\s*\n/)[0]?.trim() ?? '';

/** Everything after the first paragraph. */
export const restParagraphs = (body?: string) =>
  body?.split(/\n\s*\n/).slice(1).join('\n\n').trim() ?? '';
