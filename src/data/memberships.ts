/**
 * Non-team memberships & performance add-ons for the /team page.
 * Source: Robbie's "C26 Aquatics Master List ' 2026" sheet (Sept 1 email).
 * Team-group registration links live in each group's frontmatter instead.
 */

export interface Membership {
  name: string;
  description: string;
  href: string; // Momence checkout, monthly billing
}

export const memberships: Membership[] = [
  {
    name: 'Kraken Open Swim Pass',
    description: 'Monthly lap- and open-swim access to the Bluhawk pool.',
    href: 'https://momence.com/m/880910',
  },
  {
    name: 'Kraken Recovery',
    description: 'Recovery membership — tools and space to bounce back between sessions.',
    href: 'https://momence.com/m/892010',
  },
  {
    name: 'Kraken Develop',
    description: 'Performance add-on for building foundational strength and mechanics.',
    href: 'https://momence.com/m/891989',
  },
  {
    name: 'Kraken Performance',
    description: 'Performance add-on for swimmers ready to push training further.',
    href: 'https://momence.com/m/891996',
  },
  {
    name: 'Kraken Elite',
    description: 'Top-tier performance add-on for high-level competitors.',
    href: 'https://momence.com/m/891997',
  },
];
