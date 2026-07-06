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

export interface Principle {
  /** Display number, e.g. "01". Decorative — the real label lives in `title`. */
  n: string;
  title: string;
  body: string;
}

/**
 * The four commitments behind the C26 method. Rendered as numbered principle
 * cards by NumberedPrinciples.astro; condensed from the page's "Train with
 * purpose" prose.
 */
export const principles: Principle[] = [
  {
    n: '01',
    title: 'Train with purpose',
    body: "We prioritize quality over quantity — technique, efficiency, and movement patterns. The goal isn't to out-yard everyone else; it's to maximize every yard we swim.",
  },
  {
    n: '02',
    title: 'Develop for the long term',
    body: 'Science-backed periodization lets swimmers grow progressively. Rather than chasing early wins at 11, 12, or 13, we build toward full potential at 16–18 and the collegiate level.',
  },
  {
    n: '03',
    title: 'Peak when it matters most',
    body: 'We balance training stress, recovery, strength, and mobility so athletes perform at their best when it counts — while reducing the risk of burnout and overuse injury.',
  },
  {
    n: '04',
    title: 'Love the process',
    body: "Success isn't only times on a scoreboard. It's confidence, resilience, discipline, and friendships — healthy young people who love the sport for life.",
  },
];

/**
 * The C26 coaching system — the six things every practice includes. Rendered
 * as numbered cards by NumberedPrinciples.astro on /our-approach (a matched
 * pair with `principles` above); titles feed the homepage teaser strip.
 */
export const coachingSystem: Principle[] = [
  {
    n: '01',
    title: 'Teach',
    body: 'Every swimmer receives technical instruction throughout practice — not just corrections when something goes wrong. We explain why. We demonstrate how. We help swimmers understand what they are trying to accomplish.',
  },
  {
    n: '02',
    title: 'Observe',
    body: 'Our coaches are constantly watching — not simply counting intervals. We look for movement patterns, habits, body position, breathing, timing, confidence, and effort. Small adjustments made daily become major improvements over time.',
  },
  {
    n: '03',
    title: 'Correct',
    body: 'Immediate feedback matters. Because of our smaller coach-to-swimmer ratios, corrections happen in real time. Instead of repeating poor habits for months, swimmers receive consistent coaching every practice.',
  },
  {
    n: '04',
    title: 'Reinforce',
    body: "When swimmers make improvements, we recognize them. Confidence grows when athletes know what they're doing well. Positive reinforcement creates athletes who enjoy the process of getting better.",
  },
  {
    n: '05',
    title: 'Challenge',
    body: 'Every swimmer deserves to be challenged — but at the appropriate level. Practices are designed to stretch athletes beyond their comfort zone without overwhelming them. We meet swimmers where they are while preparing them for where they want to go.',
  },
  {
    n: '06',
    title: 'Connect',
    body: 'Relationships matter. Great coaching begins with trust. We intentionally build relationships with every swimmer so they know they are valued beyond their performances.',
  },
];

/**
 * Coach Robbie's marquee open-water results, shown as a credential chip row in
 * the "Beyond the pool" band on /our-approach. Condensed from the page prose.
 */
export const openWaterCredentials: string[] = [
  'Top-5 · Open Water Zones',
  'National 5K Collegiate',
  'Pro Triathlon',
  'English Channel',
];

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

/**
 * Four punchy head-to-head pairs for the homepage teaser. Condensed from
 * differenceRows; the full nine-row comparison lives on /our-approach#difference.
 */
export const condensedDifferenceRows: DifferenceRow[] = [
  {
    traditional: 'Multiple pool locations and changing practice sites',
    c26: 'One home. One pool. One standard — we own our facility.',
  },
  {
    traditional: 'Different coaches from practice to practice',
    c26: 'Consistent staff who know your swimmer and how they learn.',
  },
  {
    traditional: 'Generalized plans for large groups',
    c26: 'Individualized development tailored to age and ability.',
  },
  {
    traditional: 'Swimmers wait months for move-ups',
    c26: 'Move up when ready — no waiting for a calendar date.',
  },
];

export const differenceSummary =
  "We don't believe in simply putting swimmers through yards. We believe in developing athletes. We coach the person first and the swimmer second. We prioritize relationships, consistency, and intentional progress. Our goal is to create confident, resilient young people who learn discipline, accountability, and a love for the process.";
