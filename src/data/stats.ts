/**
 * Headline stats shown in the scrolling StatsBand ticker on the homepage.
 * Copy per Robbie ("Website Front Page Ticker," Jun 29). Items with a `value`
 * render as a big number + label; a bare `label` renders as a standalone phrase.
 */
export interface Stat {
  value?: string;
  label: string;
}

/**
 * Growth-claim band (GrowthBand) between the stats ticker and mission band.
 * Bump `count` and `updated` as Robbie reports new roster numbers — the
 * number is live text, never artwork.
 */
export const growth = {
  count: 110,
  label: 'swimmers and climbing',
  updated: 'August 2026',
};

export const homeStats: Stat[] = [
  { value: '35+', label: 'years coaching experience' },
  { value: '500+', label: 'swimmers coached' },
  { value: '300+', label: 'video stroke sessions' },
  { value: '21+', label: 'states represented' },
  { label: '4 strokes. 1 development system.' },
];
