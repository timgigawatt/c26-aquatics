/**
 * The four program tracks shown in the homepage TracksLadder.
 * Source of truth — share with any future track-detail pages.
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
    title: 'Infant / Learning',
    age: '6 mo – beginner',
    desc: 'Water acclimation, safety skills, and the foundations of all four strokes.',
    cta: 'View swim lessons →',
    href: '/swim-lessons',
  },
  {
    num: '02',
    title: 'Pre-Compete',
    age: 'Developing',
    desc: 'The bridge from lessons to the team — stroke refinement, first training sets, and race basics.',
    cta: 'View program →',
    href: '/team',
  },
  {
    num: '03',
    title: 'Competitive',
    age: 'Squad',
    desc: 'Race-focused, periodized training with meets, goals, and measurable personal bests.',
    cta: 'View program →',
    href: '/team',
  },
  {
    num: '04',
    title: 'Adult / Multisport',
    age: '18+',
    desc: 'Adult learn-to-swim, fitness swimming, and triathlon / open-water for multisport athletes.',
    cta: 'View program →',
    href: '/adult-multisport',
  },
];
