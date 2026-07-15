# Footer legal links + Gigawatt Lab credit

**Date:** 2026-07-15
**Status:** Approved

## Goal

Add the four legal links (privacy policy, cookie policy, terms of service,
disclaimer) to the site footer and replace the bottom-bar copyright with
"© {year} C26 Aquatics | Powered by Gigawatt Lab", where "Gigawatt Lab"
links to https://gigawattlab.com.

## Background

- The legal pages already exist on the client's other site, C26 Hub
  (same LLC). No new pages or routes are needed here — the footer links
  point at the hub URLs.
- `Footer.astro` already has an unused `.c26-footer__legal` class and a
  space-between bottom bar, so the layout slot was anticipated.
- `ConsentBanner.astro` carries a TODO placeholder (`href="#"`) for the
  privacy notice; this work closes it.

## Design

### Data (`src/data/nav.ts`)

New `legalLinks: readonly NavItem[]` next to `footerLinks`:

| Label | URL |
| --- | --- |
| Privacy Policy | https://www.c26hub.com/privacy-policy/ |
| Cookie Policy | https://www.c26hub.com/cookie-policy/ |
| Terms of Service | https://www.c26hub.com/terms-of-service/ |
| Disclaimer | https://www.c26hub.com/disclaimer/ |

### Footer bottom bar (`src/components/layout/Footer.astro`)

```
© 2026 C26 Aquatics | Powered by Gigawatt Lab     Privacy Policy · Cookie Policy · Terms of Service · Disclaimer
```

- "Gigawatt Lab" → https://gigawattlab.com, new tab, `rel="noopener noreferrer"`.
- Legal links render right-aligned from `legalLinks`, muted to match the
  bar, wrapping under the copyright on narrow screens.
- The "· Kansas City, KS" suffix is dropped (city already appears in the
  Contact column).

### Consent banner (`src/components/layout/ConsentBanner.astro`)

Point "Read our privacy notice." at the hub privacy-policy URL and remove
the TODO.

## Open item

The hub's legal pages are branded "C26 Hub" rather than "C26 Aquatics".
Same LLC, presumably fine — client should confirm eventually.
