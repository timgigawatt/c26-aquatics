/**
 * The seven competitive training groups, shown as the homepage TracksLadder.
 * Taglines mirror Robbie's group definitions; full details live on /team.
 * Source of truth for the homepage ladder — keep in sync with the
 * `training-groups` content collection.
 */
export interface Track {
  num: string;
  title: string;
  age: string;
  desc: string;
  cta: string;
  href: string;
}

export const tracks: Track[] = [
  {
    num: '01',
    title: 'Pre-Competitive',
    age: '5–8 yrs',
    desc: 'Learn to Love Swimming — foundation skills, water comfort, and strong technical habits in a fun, supportive environment.',
    cta: 'View group →',
    href: '/team#pre-competitive',
  },
  {
    num: '02',
    title: 'Novice Age Group',
    age: '7–12 yrs',
    desc: 'Learn to Train — the first stage of structured training and a full understanding of all four strokes.',
    cta: 'View group →',
    href: '/team#novice-age-group',
  },
  {
    num: '03',
    title: 'Advanced Age Group',
    age: '9–14 yrs',
    desc: 'Train to Improve — refined technique, IM development, and intentional performance work.',
    cta: 'View group →',
    href: '/team#advanced-age-group',
  },
  {
    num: '04',
    title: 'Junior Olympic',
    age: '9–14 yrs',
    desc: 'Train to Compete — time standards, championship prep, and advancement into higher-level competition.',
    cta: 'View group →',
    href: '/team#junior-olympic',
  },
  {
    num: '05',
    title: 'Pre-Senior',
    age: '11–14 yrs',
    desc: 'Train to Excel — the blueprint to senior performance across District, State, Zone, and Sectional competition.',
    cta: 'View group →',
    href: '/team#pre-senior',
  },
  {
    num: '06',
    title: 'High School Prep',
    age: '14–18 yrs',
    desc: 'Train with Purpose — efficient, results-focused training that balances school, activities, and life.',
    cta: 'View group →',
    href: '/team#high-school-prep',
  },
  {
    num: '07',
    title: 'Senior Elite',
    age: '13–18 yrs',
    desc: 'Train to Perform — the pinnacle of the pathway, aimed at the highest levels of senior and collegiate swimming.',
    cta: 'View group →',
    href: '/team#senior-elite',
  },
];
