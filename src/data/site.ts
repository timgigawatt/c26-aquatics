/**
 * Site-wide singletons. Single source of truth for contact info, social links,
 * booking URLs, and the address used in SportsOrganization JSON-LD.
 *
 * Items marked `TODO` need real values before launch.
 */
export const site = {
  name: 'C26 Aquatics',
  shortName: 'C26',
  tagline: 'Become a stronger swimmer.',
  description:
    'C26 Aquatics is a Kansas City–area competitive swim team — one pool, one coaching staff, one standard. Train with certified coaches across the KC metro.',
  url: 'https://c26aquatics.com',

  contact: {
    // TODO: confirm real values before launch
    email: 'info@c26aquatics.com',
    phone: '+1-913-555-0100',
    phoneDisplay: '(913) 555-0100',
  },

  // Physical home — inside the Bluhawk development in south Overland Park.
  address: {
    streetAddress: '16201 Shawnee Dr Suite 126',
    addressLocality: 'Overland Park',
    addressRegion: 'KS',
    postalCode: '66223',
    addressCountry: 'US',
  },

  // Venue context surfaced in the LocationBand + org JSON-LD.
  place: {
    venue: 'Bluhawk',
    amenities: [],
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Bluhawk+16201+Shawnee+Dr+Suite+126+Overland+Park+KS+66223',
    // TODO: confirm full weekly hours with the client (Google shows "Closes 8 PM").
    hours: '',
  },

  // TODO: confirm real social handles
  social: {
    instagram: 'https://www.instagram.com/c26aquatics',
    facebook: 'https://www.facebook.com/c26aquatics',
  },

  /**
   * External booking URLs. CTAs across the site link to these.
   * Update once the booking system / public URLs are confirmed.
   */
  booking: {
    // Momence product page for the team evaluation & placement fee. Wired to
    // every "Join the Team" CTA and the /team evaluations section.
    team: 'https://momence.com/C26-Hub-LLC/product/Swim-Team-Evaluation-and-Placement-Fee%3A-%24100.00/500138',
  },

  // GA4 — set via env var or hardcode once provisioned
  // TODO: replace with real measurement ID
  ga4MeasurementId: 'G-XXXXXXXXXX',
} as const;

export type Site = typeof site;
