export interface ServiceAreaCity {
  name: string;
  state: 'KS' | 'MO';
  /** Optional per-city note for local SEO copy. */
  note?: string;
}

/**
 * Communities served by C26 Aquatics across the Kansas City metro.
 * Surfaced on the home page footer and the /about service-area section,
 * and emitted in the SportsOrganization `areaServed` schema.
 */
export const serviceArea: readonly ServiceAreaCity[] = [
  { name: 'Leawood', state: 'KS' },
  { name: 'Lenexa', state: 'KS' },
  { name: 'Olathe', state: 'KS' },
  { name: 'Overland Park', state: 'KS' },
  { name: 'Prairie Village', state: 'KS' },
  { name: 'Shawnee', state: 'KS' },
] as const;

export const serviceAreaSummary =
  'Serving the Kansas City metro — Leawood, Lenexa, Olathe, Overland Park, Prairie Village, and Shawnee.';
