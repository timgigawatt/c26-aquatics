/**
 * Build-time client for the Gigawatt CMS (Payload 3 REST API).
 *
 * Reads anonymously and scopes every query to the c26 tenant with a
 * `tenant.slug` filter — the standard pattern for Gigawatt tenant sites (the
 * CMS's public read access expects sites to filter by tenant slug themselves;
 * drafted collections only expose published docs to anonymous readers).
 *
 * All fetchers cache in-module — the whole build makes one request per
 * collection. Any failure throws: a broken build is visible, silently-stale
 * content is not.
 */

const env = (key: string): string | undefined =>
  (import.meta.env?.[key] as string | undefined) ?? process.env[key];

const CMS_URL = env('CMS_URL') || 'https://gigawatt-cms--gigawatt-lab.us-central1.hosted.app';
const BASE = `${CMS_URL}/api`;
const TENANT = env('CMS_TENANT') || 'c26';
const tenantFilter = `where%5Btenant.slug%5D%5Bequals%5D=${TENANT}`;

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

const get = async (path: string) => {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`CMS build failed: GET ${path} returned ${res.status}.`);
  return res.json();
};

/** Fetch every c26 doc in a tenant-scoped collection, sorted. */
const allDocs = async <T>(collection: string, sort = 'order'): Promise<T[]> => {
  const json = await get(
    `/${collection}?limit=200&depth=1&sort=${encodeURIComponent(sort)}&${tenantFilter}`,
  );
  return json.docs as T[];
};

const cache = new Map<string, Promise<unknown>>();
const cached = <T>(key: string, load: () => Promise<T>): Promise<T> => {
  if (!cache.has(key)) cache.set(key, load());
  return cache.get(key) as Promise<T>;
};

// --- Public fetchers -----------------------------------------------------------

export const getPages = () =>
  cached('pages', async () => {
    const docs = await allDocs<CmsPage & { _status?: string }>('pages', 'slug');
    return docs.filter((p) => p._status === 'published');
  });

export const getPage = async (slug: string) => {
  const page = (await getPages()).find((p) => p.slug === slug);
  if (!page) throw new Error(`CMS build failed: no published page with slug "${slug}".`);
  return page;
};

export const getPrograms = () => cached('programs', () => allDocs<CmsProgram>('programs'));

export const getTeamMembers = () =>
  cached('team-members', async () => {
    const docs = await allDocs<CmsTeamMember>('team-members');
    return docs.filter((m) => m.showInTeam !== false);
  });

export const getAnnouncements = () =>
  cached('announcements', () => allDocs<CmsAnnouncement>('announcements', '-startDate'));

export const getNavigation = () =>
  cached('navigation', async () => {
    const json = await get(`/navigation?limit=1&depth=0&${tenantFilter}`);
    return (json.docs?.[0]?.items ?? []) as CmsNavItem[];
  });

export const getFooter = () =>
  cached('footer', async () => {
    const json = await get(`/footer?limit=1&depth=0&${tenantFilter}`);
    return (json.docs?.[0] ?? {}) as CmsFooter;
  });

export const getSeoSettings = () =>
  cached('seo-settings', async () => {
    const json = await get(`/seo-settings?limit=1&depth=0&${tenantFilter}`);
    return (json.docs?.[0] ?? {}) as CmsSeoSettings;
  });

// --- Helpers ---------------------------------------------------------------------

/** Absolute URL for an upload (CMS returns host-relative /api/media/file/... paths). */
export const mediaUrl = (media?: CmsMedia | null) =>
  media?.url ? (media.url.startsWith('http') ? media.url : `${CMS_URL}${media.url}`) : undefined;

/** First paragraph of a blank-line-separated body (program card taglines). */
export const firstParagraph = (body?: string) => body?.split(/\n\s*\n/)[0]?.trim() ?? '';

/** Everything after the first paragraph. */
export const restParagraphs = (body?: string) =>
  body?.split(/\n\s*\n/).slice(1).join('\n\n').trim() ?? '';
