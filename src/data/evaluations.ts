/**
 * Evaluations & registration data for the /team page.
 * Source: Robbie's "Other Misc Items to Add" email (Jun 29).
 *
 * ⚠️ GROUP-NAME MAPPING (needs Robbie's confirmation): his evaluations email
 * uses "Age Group 1 / Age Group 2 / Junior," but the site's groups are
 * "Novice / Advanced / Junior Olympic." Mapping applied here:
 *   Age Group 1 → Novice Age Group
 *   Age Group 2 → Advanced Age Group
 *   Junior      → Junior Olympic
 */

export const evaluationDates = 'August 22–26';

export const teamStructureNotes: string[] = [
  '2–3 coaches on deck for every group, for a smaller coach-to-swimmer ratio.',
  '$100 annual administrative / group placement fee per swimmer.',
  'Monthly fees include onsite functional strength, plyometrics, and injury-prevention training at the Bluhawk facility.',
  'No fundraising fees or required parent hours.',
];

/** Required equipment. Groups fall into a base tier and an advanced tier. */
export const equipment = {
  base: {
    items: ['Short fins', 'Cap', 'Goggles', 'Kickboard'],
    groups: ['Pre-Competitive', 'Novice Age Group', 'Advanced Age Group'],
  },
  advanced: {
    items: ['Short fins', 'Cap', 'Goggles', 'Kickboard', 'Pull buoy', 'Snorkel', 'Hand paddles'],
    groups: ['Junior Olympic', 'Pre-Senior', 'High School Prep', 'Senior Elite'],
  },
};

export interface PreferredProduct {
  item: string;
  product: string;
}

export const preferredProducts: PreferredProduct[] = [
  { item: 'Short fins', product: 'Arena Training Fins / Arena Powerfin-style short fins' },
  { item: 'Kickboard', product: 'Arena Kickboard' },
  { item: 'Pull buoy', product: 'Arena Freeflow Pull Buoy II' },
  { item: 'Snorkel', product: 'Arena Swim Snorkel III' },
  { item: 'Hand paddles', product: 'Strokemakers Hand Paddles' },
];

export const equipmentNote =
  'Goggles and cap are personal preference. Make sure fins and paddles are sized correctly — if your swimmer is between sizes, ask a coach before purchasing.';

export interface EvaluationStandard {
  group: string;
  standards: string[];
}

export const evaluationStandards: EvaluationStandard[] = [
  {
    group: 'Pre-Competitive',
    standards: [
      'Demonstrate streamlining, proper breathing, and stroke coordination.',
      'Perform freestyle and backstroke for 15–25 yards.',
    ],
  },
  {
    group: 'Novice Age Group',
    standards: [
      'All four strokes correctly for 25 yards.',
      'Basic stroke drills with instruction.',
      'Freestyle flip turn.',
      'Finishes for all four strokes.',
    ],
  },
  {
    group: 'Advanced Age Group',
    standards: [
      'All Novice Age Group skills.',
      '100 IM with correct turns and finishes.',
      '200 freestyle with flip turns.',
      '4×50 @ 1:00.',
      '100 kick under 2:30.',
    ],
  },
  {
    group: 'Junior Olympic',
    standards: [
      '200 IM.',
      '400 freestyle with flip turns and streamlining.',
      '3×100 @ 2:00.',
      '200 kick under 4:30.',
    ],
  },
  {
    group: 'Pre-Senior',
    standards: [
      '400 IM.',
      '6×100 @ :10 rest (under 1:30).',
      '6×50 @ 1:00 (under 35 seconds).',
      '300 kick under 6:00.',
    ],
  },
  {
    group: 'High School Prep',
    standards: ['200 IM.', '400 freestyle.', '6×50 @ 1:00.', '200 kick under 4:30.'],
  },
  {
    group: 'Senior Elite',
    standards: [
      'Complete all pre-season evaluations.',
      'Set up a meeting with the Performance and Program Directors.',
    ],
  },
];
