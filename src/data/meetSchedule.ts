/**
 * Official 2026–27 short course (SCY) meet schedule for the /team page.
 * Source: Robbie's "Time to turn it on!" email (Sep 16, 2026) — the club's
 * first season as a USA Swimming member. Times are TBA for every meet;
 * entry details go out to families ahead of each one.
 *
 * `dates` is display text (weekday + M/D); `groups` names the training
 * groups invited, using the site's group names rather than the sheet's
 * abbreviations.
 */
export interface Meet {
  dates: string;
  name: string;
  location: string;
  groups: string;
}

export const meetSeason = '2026–27 short course season';

export const meetSchedule: Meet[] = [
  {
    dates: 'Sat, Oct 10',
    name: 'Surge Block Party Meet #1',
    location: "Lee's Summit, MO",
    groups: 'Novice Age Group · Advanced Age Group · Junior Olympic · High School Prep · Pre-Senior · Senior Elite',
  },
  {
    dates: 'Fri, Oct 23 – Sun, Oct 25',
    name: 'Jenks Fall Invitational',
    location: 'Jenks, OK',
    groups: 'Advanced Age Group · Junior Olympic · High School Prep · Pre-Senior · Senior Elite',
  },
  {
    dates: 'Fri, Nov 6 – Sun, Nov 8',
    name: 'I-Fly A3 Midwest Challenge',
    location: 'Iowa City, IA',
    groups: 'High School Prep · Pre-Senior · Senior Elite',
  },
  {
    dates: 'Sat, Nov 7',
    name: 'Surge Block Party Meet #2',
    location: "Lee's Summit, MO",
    groups: 'Pre-Competitive · Novice Age Group · Advanced Age Group · Junior Olympic',
  },
  {
    dates: 'Fri, Nov 20 – Sun, Nov 22',
    name: 'EKC Woody Memorial',
    location: 'Topeka, KS',
    groups: 'Novice Age Group · Advanced Age Group · Junior Olympic · High School Prep · Pre-Senior · Senior Elite',
  },
  {
    dates: 'Fri, Dec 4 – Sun, Dec 6',
    name: 'Midwest Winter Classic',
    location: 'Lenexa, KS',
    groups: 'Qualifiers',
  },
  {
    dates: 'Sat, Dec 19 – Sun, Dec 20',
    name: 'Frosty Frolic',
    location: 'Topeka, KS',
    groups: 'Swimmers not qualified for the Midwest Winter Classic',
  },
  {
    dates: 'Fri, Jan 8 – Sun, Jan 10',
    name: 'NWAA Winter Invitational',
    location: 'Fayetteville, AR',
    groups: 'All competitive groups — team travel meet',
  },
  {
    dates: 'Sat, Jan 16 or Sat, Jan 23',
    name: 'Surge Block Party Meet #3',
    location: "Lee's Summit, MO",
    groups: 'Pre-Competitive · Novice Age Group · Advanced Age Group · Junior Olympic',
  },
  {
    dates: 'Sat, Jan 23',
    name: 'Tiger Classic',
    location: 'Columbia, MO',
    groups: 'Junior Olympic · High School Prep · Pre-Senior · Senior Elite',
  },
  {
    dates: 'Fri, Jan 29 – Sun, Jan 31',
    name: 'Club North Invite',
    location: 'Gladstone, MO',
    groups: 'Pre-Competitive · Novice Age Group · Advanced Age Group · Junior Olympic',
  },
  {
    dates: 'Early February — dates TBC',
    name: 'MV District Championships',
    location: 'Topeka, KS or Gladstone, MO',
    groups: 'Qualifiers, 14 & under',
  },
  {
    dates: 'Thu, Feb 25 – Sun, Feb 28',
    name: 'MV Senior Championships',
    location: 'Topeka, KS',
    groups: 'Ages 15 & older',
  },
  {
    dates: 'Thu, Mar 4 – Sun, Mar 7',
    name: 'MV Age Group Championships',
    location: 'Columbia, MO',
    groups: 'Qualifiers, 14 & under',
  },
  {
    dates: 'Thu, Mar 11 – Sun, Mar 14',
    name: 'Four Corners Speedo Sectionals',
    location: 'Iowa City, IA',
    groups: 'Qualifiers',
  },
];
