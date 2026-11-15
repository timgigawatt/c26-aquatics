import { site } from './site';
import { privacyPolicy, privacyUrl } from './legal';

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
  { label: 'Contact', href: '/contact' },
  { label: 'Team Store', href: site.store, external: true },
] as const;

export const footerLinks: readonly NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Team', href: '/team' },
  { label: 'Our Approach', href: '/our-approach' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Coaches', href: '/coaches' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
  { label: 'Team Store', href: site.store, external: true },
] as const;

// Legal pages live on the C26 Hub site (same LLC). The privacy policy moves
// on-site once src/data/legal.ts → privacyPolicy.published is true.
export const legalLinks: readonly NavItem[] = [
  { label: 'Privacy Policy', href: privacyUrl, external: privacyUrl === privacyPolicy.externalUrl },
  { label: 'Cookie Policy', href: 'https://www.c26hub.com/cookie-policy/', external: true },
  { label: 'Terms of Service', href: 'https://www.c26hub.com/terms-of-service/', external: true },
  { label: 'Disclaimer', href: 'https://www.c26hub.com/disclaimer/', external: true },
] as const;
