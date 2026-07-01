/**
 * Proposed meet schedule for the /team page.
 * Source: Robbie's "Other Misc Items to Add" email (Jun 29). Marked "proposed" —
 * dates/meets may shift as the season firms up.
 */
export interface MeetPeriod {
  period: string;
  meets: string[];
}

export const meetSchedule: MeetPeriod[] = [
  { period: 'September (early)', meets: ['Dual or Tri with local teams'] },
  { period: 'September (late)', meets: ['NLU Sprint Decathlon — North KC'] },
  {
    period: 'October (early)',
    meets: ['Drury University / Tsunami Fall Round-up — Springfield, MO'],
  },
  { period: 'October (late)', meets: ['University of Missouri — Columbia, MO'] },
  { period: 'November', meets: ['Club North — North KC', 'Arkansas or Oklahoma meet'] },
  {
    period: 'December',
    meets: ['Midwest Winter Classic', 'Possible Dual or Tri', '10 & Under Future Stars — North KC'],
  },
  {
    period: 'January',
    meets: ['Midwest All Stars', 'Topeka True Blue', 'Arkansas or Oklahoma meet'],
  },
  { period: 'February', meets: ['District Champs', 'Senior Champs', 'Age Champs'] },
  { period: 'March', meets: ['Sectional Champs'] },
  { period: 'April–May', meets: ['Dual or Tri', 'Long-course meets'] },
];
