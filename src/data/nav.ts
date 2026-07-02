import { site } from '@data/site';

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export const primaryNav: readonly NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Team', href: '/team' },
  { label: 'Our Approach', href: '/our-approach' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Coaches', href: '/coaches' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Safe Sport', href: site.safeSportUrl, external: true },
] as const;

export const footerLinks: readonly NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Team', href: '/team' },
  { label: 'Our Approach', href: '/our-approach' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Coaches', href: '/coaches' },
  { label: 'FAQ', href: '/faq' },
] as const;
