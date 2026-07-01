/**
 * Structured copy for the /our-approach page: mission, vision, motto,
 * the eight core values, and the Difference Matrix comparison table.
 * Source: Robbie's "Web Edits" doc. Prose-heavy blocks live inline in the page;
 * this file holds only the parts that render as repeated/structured UI.
 */

export const mission =
  'To inspire every swimmer to reach their potential through individualized training, meaningful goals, positive culture, and a commitment to personal excellence.';

export const vision =
  'We strive to create a dynamic and supportive environment where every athlete feels valued, challenged, and inspired. Through individualized training plans, meaningful mentoring, and a culture built on positivity and growth, we empower swimmers to overcome challenges, achieve personal success, and develop confidence that extends far beyond the pool. We seek to create an exclusive feeling of belonging within an inclusive team environment where every swimmer has the opportunity to thrive.';

export const motto = 'Inspiring Potential. Pursuing Purpose. Achieving Success.';

export interface CoreValue {
  title: string;
  body: string;
}

export const coreValues: CoreValue[] = [
  {
    title: 'Individual Focus',
    body: "Every swimmer's journey is unique. We provide individualized training and support to help each athlete achieve their personal goals.",
  },
  {
    title: 'Meaningful Goals',
    body: 'Purpose drives progress. We encourage swimmers to set meaningful goals and pursue them with determination.',
  },
  {
    title: 'Positive Culture',
    body: 'We foster an environment of encouragement, respect, accountability, and celebration of success.',
  },
  {
    title: 'Inspire Potential',
    body: 'We believe every athlete possesses untapped potential and we strive to help them discover and maximize it.',
  },
  {
    title: 'Overcome Challenges',
    body: 'Growth comes through adversity. We embrace challenges as opportunities to learn, adapt, and improve.',
  },
  {
    title: 'Dynamic Excellence',
    body: 'We pursue continuous improvement through innovation, effort, and a commitment to excellence.',
  },
  {
    title: 'Mentoring for Life',
    body: 'Swimming is our vehicle for developing confidence, character, leadership, and lifelong success.',
  },
  {
    title: 'Inclusive Belonging',
    body: 'We cultivate a team culture that feels special and personal while welcoming athletes of all backgrounds and abilities.',
  },
];

export interface DifferenceRow {
  traditional: string;
  c26: string;
}

export const differenceIntro =
  'At C26 Aquatics, we believe every swimmer deserves consistency, individual attention, and a clear path for long-term growth. We built our program intentionally to create an environment where athletes can develop confidence, skills, and a lifelong love for swimming.';

export const differenceRows: DifferenceRow[] = [
  {
    traditional: 'Multiple pool locations and changing practice sites',
    c26: 'One home. One pool. One standard. We own our facility and every swimmer has a true home base.',
  },
  {
    traditional: 'Different coaches from practice to practice',
    c26: 'Consistent coaching staff who know your swimmer, their goals, and how they learn best.',
  },
  {
    traditional: 'Generalized training plans for large groups',
    c26: 'Individualized development tailored to age, ability, and long-term growth.',
  },
  {
    traditional: 'High-volume, "make it or break it" environments',
    c26: 'Purposeful training focused on technique, progression, and sustainable development.',
  },
  {
    traditional: 'Large groups, limited individual attention',
    c26: 'Excellent coach-to-swimmer ratios for meaningful instruction and feedback.',
  },
  {
    traditional: 'Dryland focused on basic exercises',
    c26: 'Strength and performance training — injury prevention, mobility, strength, power, and movement quality specific to swimming.',
  },
  {
    traditional: 'Swimmers wait months for evaluations or move-ups',
    c26: 'Move-up standards happen as needed. When a swimmer is ready, they move up — no waiting for a calendar date.',
  },
  {
    traditional: 'Parent fundraising requirements',
    c26: 'No mandatory fundraising.',
  },
  {
    traditional: 'Governed by a board of directors',
    c26: 'Parent Advisory Board that provides feedback while letting coaches focus on developing swimmers.',
  },
];

export const differenceSummary =
  "We don't believe in simply putting swimmers through yards. We believe in developing athletes. We coach the person first and the swimmer second. We prioritize relationships, consistency, and intentional progress. Our goal is to create confident, resilient young people who learn discipline, accountability, and a love for the process.";
