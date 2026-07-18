/**
 * Seed the c26 tenant in the Gigawatt CMS from this repo's content.
 *
 * Reads src/content/* (markdown) and src/data/*.ts (the current source of
 * truth) and upserts everything through the CMS REST API — media first, then
 * team-members, programs, announcements, pages, and the per-tenant globals
 * (navigation, footer, seo-settings). Idempotent: re-running updates in place.
 *
 * Run:  CMS_EMAIL=... CMS_PASSWORD=... npm run seed:cms
 */
import { readFile } from 'node:fs/promises';
import { readdirSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

import { site } from '../src/data/site';
import { primaryNav, footerLinks, legalLinks } from '../src/data/nav';
import { homeStats } from '../src/data/stats';
import {
  mission,
  vision,
  principles,
  coachingSystem,
  openWaterCredentials,
  coreValues,
  differenceIntro,
  differenceRows,
  condensedDifferenceRows,
  differenceSummary,
} from '../src/data/approach';
import { tracks } from '../src/data/tracks';
import { serviceArea } from '../src/data/serviceArea';
import {
  evaluationDates,
  teamStructureNotes,
  equipment,
  preferredProducts,
  equipmentNote,
  evaluationStandards,
} from '../src/data/evaluations';
import { meetSchedule } from '../src/data/meetSchedule';

const CMS_URL = process.env.CMS_URL || 'https://gigawatt-cms--gigawatt-lab.us-central1.hosted.app';
const BASE = `${CMS_URL}/api`;
const { CMS_EMAIL, CMS_PASSWORD } = process.env;

if (!CMS_EMAIL || !CMS_PASSWORD) {
  console.error('Set CMS_EMAIL and CMS_PASSWORD (the c26 client-editor account).');
  process.exit(1);
}

const ROOT = path.resolve(import.meta.dirname, '..');
const contentDir = (name: string) => path.join(ROOT, 'src/content', name);

// --- Auth ------------------------------------------------------------------

const loginRes = await fetch(`${BASE}/users/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: CMS_EMAIL, password: CMS_PASSWORD }),
});
if (!loginRes.ok) {
  console.error(`Login failed (${loginRes.status}) — check CMS_EMAIL / CMS_PASSWORD.`);
  process.exit(1);
}
const { token } = await loginRes.json();
const headers = { Authorization: `JWT ${token}`, 'Content-Type': 'application/json' };

// --- REST helpers ----------------------------------------------------------

const api = async (method: string, apiPath: string, body?: unknown) => {
  const res = await fetch(`${BASE}${apiPath}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`${method} ${apiPath} -> ${res.status} ${JSON.stringify(json.errors || json)}`);
  }
  return json;
};

/** Find-then-PATCH-else-POST on a unique field. Returns the document id. */
const upsert = async (collection: string, field: string, value: string, data: Record<string, unknown>) => {
  const q = `where[${field}][equals]=${encodeURIComponent(value)}&limit=1&depth=0`;
  const found = await api('GET', `/${collection}?${q}`);
  const existing = found.docs?.[0];
  if (existing) {
    await api('PATCH', `/${collection}/${existing.id}`, data);
    console.log(`updated  ${collection}/${value}`);
    return existing.id;
  }
  const created = await api('POST', `/${collection}`, data);
  console.log(`created  ${collection}/${value}`);
  return created.doc.id;
};

/** One-per-tenant globals: navigation, footer, seo-settings. */
const upsertGlobal = async (collection: string, data: Record<string, unknown>) => {
  const found = await api('GET', `/${collection}?limit=1&depth=0`);
  const existing = found.docs?.[0];
  if (existing) {
    await api('PATCH', `/${collection}/${existing.id}`, data);
    console.log(`updated  ${collection}`);
  } else {
    await api('POST', `/${collection}`, data);
    console.log(`created  ${collection}`);
  }
};

/** Upload a file from /public unless a media doc with that filename exists. */
const uploadMedia = async (publicPath: string, alt: string) => {
  const filename = path.basename(publicPath);
  const q = `where[filename][equals]=${encodeURIComponent(filename)}&limit=1&depth=0`;
  const found = await api('GET', `/media?${q}`);
  if (found.docs?.[0]) {
    console.log(`kept     media/${filename}`);
    return found.docs[0].id;
  }
  const form = new FormData();
  form.append('file', new Blob([await readFile(path.join(ROOT, 'public', publicPath))]), filename);
  form.append('_payload', JSON.stringify({ alt }));
  const res = await fetch(`${BASE}/media`, {
    method: 'POST',
    headers: { Authorization: `JWT ${token}` },
    body: form,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`upload ${filename} -> ${res.status} ${JSON.stringify(json.errors || json)}`);
  console.log(`created  media/${filename}`);
  return json.doc.id;
};

// --- Content loaders -------------------------------------------------------

const readCollection = (name: string) =>
  readdirSync(contentDir(name))
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const raw = matter.read(path.join(contentDir(name), f));
      return { slug: f.replace(/\.md$/, ''), data: raw.data, body: raw.content.trim() };
    });

/** Strip HTML comments (placeholder TODOs) and trim. */
const cleanBody = (body: string) => body.replace(/<!--[\s\S]*?-->/g, '').trim();

const text = (items: string[]) => items.map((t) => ({ text: t }));
const resolveHref = (href: string) => (href === 'booking.team' ? site.booking.team : href);

const groups = readCollection('training-groups').sort((a, b) => a.data.order - b.data.order);
const coaches = readCollection('coaches').sort((a, b) => a.data.order - b.data.order);
const faqs = readCollection('faqs').sort((a, b) => a.data.order - b.data.order);
const testimonials = readCollection('testimonials').sort((a, b) => a.data.order - b.data.order);
const announcements = readCollection('announcements').filter((a) => a.slug !== 'example-announcement');

const groupName = new Map(groups.map((g) => [g.slug, g.data.name as string]));
const standardsByGroup = new Map(evaluationStandards.map((s) => [s.group, s.standards]));
const trackBySlug = new Map(tracks.map((t) => [t.href.split('#')[1], t]));

const faqItems = (surface: 'home' | 'team' | 'faq') =>
  faqs
    .filter((f) => (f.data.surfaces as string[]).includes(surface))
    .map((f) => ({
      question: f.data.question as string,
      answer:
        cleanBody(f.body) +
        (f.data.cta ? `\n\n[${f.data.cta.label}](${resolveHref(f.data.cta.href)})` : ''),
    }));

const testimonialItems = testimonials.map((t) => ({
  quote: t.data.quote as string,
  name: t.data.author as string,
  role: t.data.role as string,
  draft: false, // client-approved — already live on the site
}));

const btn = (label: string, href: string) => ({ label, href, style: 'accent' as const });

// --- Media -----------------------------------------------------------------

console.log('\n— media —');
const foundersImg = await uploadMedia('/photos/founders.png', 'The C26 Aquatics founders on deck');
const exteriorImg = await uploadMedia(
  '/photos/facility-exterior.png',
  'The C26 Aquatics facility inside Bluhawk',
);
const hubPoolImg = await uploadMedia('/photos/hub-pool.png', 'The three-lane lap pool at the C26 Hub');
const openWaterImg = await uploadMedia(
  '/photos/open-water.png',
  'C26 swimmers competing in an open water race',
);
const openHouseImg = await uploadMedia(
  '/uploads/open-house.png',
  'C26 Aquatics Open House flyer — a young swimmer in goggles beside the C26 kraken',
);

// --- Team members (coaches) --------------------------------------------------

console.log('\n— team-members —');
for (const c of coaches) {
  const sections = [
    {
      heading: 'Training groups',
      display: 'pills',
      items: (c.data.groups as string[]).map((slug) => ({ text: groupName.get(slug) ?? slug })),
    },
    { heading: 'Highlights', display: 'list', items: text(c.data.highlights as string[]) },
  ];
  if (c.data.credentials?.length) {
    sections.push({ heading: 'Credentials', display: 'pills', items: text(c.data.credentials) });
  }
  await upsert('team-members', 'slug', c.slug, {
    name: c.data.name,
    slug: c.slug,
    role: c.data.role,
    group: 'Coaches',
    order: c.data.order,
    showInTeam: true,
    summary: c.data.tagline,
    bio: cleanBody(c.body),
    specialties: ((c.data.programs as string[] | undefined) ?? []).map((label) => ({ label })),
    sections,
  });
}

// --- Programs ----------------------------------------------------------------

console.log('\n— programs —');
for (const g of groups) {
  const track = trackBySlug.get(g.slug);
  // Convention: first paragraph is the card tagline; the rest is the full copy.
  const description = track ? `${track.desc}\n\n${g.body}` : g.body;
  await upsert('programs', 'slug', g.slug, {
    name: g.data.name,
    slug: g.slug,
    order: g.data.order,
    ageRange: g.data.ageRange,
    groupSize: g.data.groupSize,
    commitmentLevel: g.data.commitmentLevel,
    suggestedPractices: g.data.suggestedPractices,
    monthlyHours: g.data.monthlyHours,
    monthlyCost: g.data.monthlyCost,
    costPerHour: g.data.costPerHour,
    scheduleOptions: g.data.scheduleOptions ?? [],
    prerequisites: [],
    evaluationStandards: text(standardsByGroup.get(g.data.name as string) ?? []),
    description,
    ctaLabel: 'View group →',
    ctaHref: `/team#${g.slug}`,
  });
}

// --- Announcements -----------------------------------------------------------

console.log('\n— announcements —');
for (const a of announcements) {
  await upsert('announcements', 'title', a.data.title as string, {
    title: a.data.title,
    body: cleanBody(a.body),
    image: a.data.image ? openHouseImg : undefined,
    startDate: new Date(a.data.startDate).toISOString(),
    endDate: new Date(a.data.endDate).toISOString(),
    draft: a.data.draft ?? true,
  });
}

// --- Pages ---------------------------------------------------------------------

console.log('\n— pages —');
const upsertPage = (slug: string, data: Record<string, unknown>) =>
  upsert('pages', 'slug', slug, { ...data, slug, type: 'generic', _status: 'published' });

const joinBtn = btn('Join the Team', site.booking.team);

await upsertPage('home', {
  title: 'Home',
  seo: {
    title: 'C26 Aquatics — Competitive Swim Team in Kansas City',
    description:
      'C26 Aquatics is a Kansas City–metro competitive swim team — one pool, one coaching staff, one standard. Training groups from developmental to elite.',
  },
  layout: [
    {
      blockType: 'hero',
      variant: 'home',
      headline: 'Become a <span class="hero-accent-magenta">stronger</span> swimmer',
      body: 'Competitive swim training in the Kansas City metro — one pool, one coaching staff, one standard.',
      buttons: [joinBtn, { label: 'Explore training groups', href: '#tracks', style: 'paper' }],
    },
    {
      blockType: 'statsBand',
      stats: homeStats.map((s) =>
        // The block requires both num and label; the one bare-label stat
        // ("4 strokes. 1 development system.") splits cleanly on its number.
        s.value ? { num: s.value, label: s.label } : { num: '4', label: 'strokes. 1 development system.' },
      ),
    },
    {
      blockType: 'richText',
      eyebrow: 'Our mission',
      heading: 'Coach the person first, the swimmer second',
      body: `${mission}\n\nWe prioritize relationships, consistency, and intentional progress — building confident, resilient young people who learn discipline, accountability, and a love for the process.`,
      image: foundersImg,
      imagePosition: 'right',
      buttons: [{ label: 'Read our story', href: '/our-story', style: 'ink' }],
    },
    {
      blockType: 'comparisonTable',
      eyebrow: 'Why C26',
      heading: 'The C26 difference',
      leftLabel: 'Traditional clubs',
      rightLabel: 'C26 Aquatics',
      rows: condensedDifferenceRows.map((r) => ({ left: r.traditional, right: r.c26 })),
      condensed: true,
      ctaLabel: 'See the full comparison',
      ctaHref: '/our-approach#difference',
    },
    {
      blockType: 'chipsBand',
      heading: 'Six things every C26 practice includes — from every coach, in every group.',
      chips: coachingSystem.map((c) => ({ text: c.title })),
      ctaLabel: 'See how we coach',
      ctaHref: '/our-approach/#coaching-system',
    },
    {
      blockType: 'programLadder',
      display: 'cards',
      eyebrow: 'Programs',
      heading: 'Training groups',
      intro:
        'Seven groups take a swimmer from their first strokes to the highest levels of competition — one clear development pathway, one standard.',
    },
    {
      blockType: 'teamGrid',
      eyebrow: 'The staff',
      heading: 'Coaches & bios',
      subtitle: 'Professional coaches building swimmers across the KC metro.',
      group: 'Coaches',
      limit: 4,
      columns: '4',
      tone: 'light',
      watermark: 'left',
    },
    { blockType: 'testimonials', heading: 'In their words', items: testimonialItems },
    {
      blockType: 'locationBand',
      eyebrow: 'Our home',
      heading: 'One pool. One standard.',
      blurb:
        'Everything happens under one roof — inside Bluhawk in Overland Park. No satellites, no rotating rental lanes. Every swimmer trains in the same water with the same staff.',
      address: {
        streetAddress: site.address.streetAddress,
        addressLocality: site.address.addressLocality,
        addressRegion: site.address.addressRegion,
        postalCode: site.address.postalCode,
      },
      mapsUrl: site.place.mapsUrl,
      image: exteriorImg,
    },
    {
      blockType: 'chipsBand',
      heading: 'Proudly serving the KC metro',
      subtitle: 'One pool, one staff — drawing swimmers from across the Kansas City suburbs.',
      chips: serviceArea.map((c) => ({ text: c.name, note: c.state })),
      ctaLabel: 'Explore the team',
      ctaHref: '/team',
    },
    { blockType: 'faq', heading: 'Frequently asked', items: faqItems('home') },
    {
      blockType: 'ctaBand',
      headingLines: [{ text: "Get in the <span class='hero-accent accent'>water</span>" }],
      buttons: [joinBtn, { label: 'Read our approach', href: '/our-approach', style: 'paper' }],
      watermark: 'right',
    },
  ],
});

await upsertPage('team', {
  title: 'Competitive Team',
  seo: {
    title: 'Competitive Swim Team | C26 Aquatics',
    description:
      'Train with C26 Aquatics — competitive training groups for KC-metro athletes from developmental to elite. Find your training group.',
  },
  layout: [
    {
      blockType: 'hero',
      variant: 'page',
      eyebrow: 'Competitive team',
      headline: "Train. Compete. <span class='hero-accent'>Improve.</span>",
      body: 'Training groups for committed athletes — Pre-Competitive through Senior Elite.',
      buttons: [joinBtn],
    },
    {
      blockType: 'programLadder',
      display: 'tabs',
      eyebrow: 'Training groups',
      heading: 'Find your training group',
      intro: 'Seven groups, calibrated by age and ability — every swimmer placed by coach evaluation.',
    },
    {
      blockType: 'programLadder',
      display: 'table',
      eyebrow: 'At a glance',
      heading: 'Compare the groups',
      intro: 'Every group side by side — ages, schedule load, and cost per pool hour.',
    },
    {
      blockType: 'richText',
      eyebrow: 'Why C26',
      heading: 'Coached by professionals. Built for the long run.',
      body:
        'Every group is led by a professional coach. We chase consistency over hype — measured progress, season after season.\n\n**7** training groups · **100%** professional career coaches · **6+** KC-metro communities served',
    },
    {
      blockType: 'richText',
      eyebrow: 'Join the team',
      heading: 'Evaluations & registration',
      body:
        `Team evaluations for the coming season run **${evaluationDates}**. Every new swimmer starts with a free water evaluation so our coaches can recommend the right training group.\n\n` +
        teamStructureNotes.map((n) => `- ${n}`).join('\n'),
      buttons: [btn('Book an evaluation', site.booking.team)],
    },
    {
      blockType: 'tieredList',
      heading: 'Required equipment',
      tiers: [
        { label: 'Base kit', intro: equipment.base.groups.join(' · '), items: text(equipment.base.items) },
        {
          label: 'Full kit',
          intro: equipment.advanced.groups.join(' · '),
          items: text(equipment.advanced.items),
        },
        {
          label: 'Preferred products',
          items: preferredProducts.map((p) => ({ text: `${p.item} — ${p.product}` })),
        },
      ],
      footnote: equipmentNote,
    },
    {
      blockType: 'scheduleList',
      heading: 'Proposed meet schedule',
      intro: 'Dates and meets may shift as the season firms up.',
      periods: meetSchedule.map((m) => ({ period: m.period, items: text(m.meets) })),
    },
    { blockType: 'faq', heading: 'Team FAQs', items: faqItems('team') },
    {
      blockType: 'ctaBand',
      headingLines: [{ text: "Ready to <span class='hero-accent accent'>join the team?</span>" }],
      buttons: [joinBtn, { label: 'Meet the coaches', href: '/coaches', style: 'paper' }],
    },
  ],
});

await upsertPage('coaches', {
  title: 'Our Coaches',
  seo: {
    title: 'Our Coaches | C26 Aquatics',
    description:
      'Meet the C26 Aquatics coaching staff — professional coaches developing competitive and beginner swimmers across the KC metro.',
  },
  layout: [
    {
      blockType: 'hero',
      variant: 'page',
      eyebrow: 'Coaches',
      headline: "Meet the <span class='hero-accent'>coaching staff</span>",
      body: 'KC-rooted and career-committed — every coach here is a professional, not a part-timer.',
    },
    {
      blockType: 'teamGrid',
      eyebrow: 'The staff',
      heading: 'The C26 coaching staff',
      subtitle: 'See bios, credentials, and how to reach the right coach for your swimmer.',
      group: 'Coaches',
      columns: '3',
      tone: 'light',
    },
    {
      blockType: 'ctaBand',
      headingLines: [{ text: "Train with the <span class='hero-accent accent'>best</span>" }],
      buttons: [joinBtn, { label: 'Read our approach', href: '/our-approach', style: 'paper' }],
    },
  ],
});

await upsertPage('our-approach', {
  title: 'Our Approach',
  seo: {
    title: 'Our Approach | C26 Aquatics',
    description:
      "How C26 Aquatics develops swimmers — purposeful, periodized training, long-term athlete development, a single home pool, and the Midwest's premier open water program in the Kansas City metro.",
  },
  layout: [
    {
      blockType: 'hero',
      variant: 'page',
      eyebrow: 'Our Approach',
      headline: "Our <span class='hero-accent'>approach</span>",
      body: 'Great swimmers are developed through purpose, patience, and consistency — not endless laps and accumulated yardage.',
    },
    {
      blockType: 'process',
      heading: "Our coaches don't supervise workouts. They coach.",
      steps: coachingSystem.map((c) => ({ num: c.n, title: c.title, copy: c.body })),
    },
    {
      blockType: 'richText',
      body:
        'Most swim clubs measure success by attendance and race results. We believe race results are simply the outcome of hundreds of meaningful coaching moments. Our responsibility is to win those moments every single day.\n\nEvery coach at C26 Aquatics is trained within this system. Regardless of which coach is leading a lane on a given day, families can expect the same standard of instruction, communication, accountability, and care.',
    },
    {
      blockType: 'process',
      heading: 'Train with purpose',
      steps: principles.map((p) => ({ num: p.n, title: p.title, copy: p.body })),
    },
    {
      blockType: 'richText',
      body: 'Train with purpose. Develop for the long term. Peak when it matters most. Love the process.',
    },
    {
      blockType: 'comparisonTable',
      eyebrow: 'Why C26',
      heading: 'The C26 difference',
      intro: differenceIntro,
      leftLabel: 'Traditional clubs',
      rightLabel: 'C26 Aquatics',
      rows: differenceRows.map((r) => ({ left: r.traditional, right: r.c26 })),
      summary: differenceSummary,
      tagline: 'One Home. One Pool. One Standard.',
    },
    {
      blockType: 'richText',
      eyebrow: 'Our mission',
      body: `${mission}\n\n**Our vision** — ${vision}`,
    },
    {
      blockType: 'servicesPreview',
      heading: 'Our core values',
      items: coreValues.map((v) => ({ title: v.title, description: v.body })),
    },
    {
      blockType: 'richText',
      eyebrow: 'Beyond the scoreboard',
      heading: 'More than a sport',
      body: [
        "Swimming isn't just about learning strokes and improving times. Research consistently shows that regular physical activity can improve anxiety, emotional regulation, attention, and executive functioning in children and adolescents.",
        'The unique nature of swimming makes it especially beneficial. The rhythmic breathing, repetitive movements, structured environment, and sensory experience of the water can help many children feel calmer, more focused, and more regulated. Swimming also provides predictable routines, clear expectations, and opportunities to build confidence through measurable progress.',
        'For children with ADHD, research has found that regular exercise can significantly improve attention, emotional regulation, and symptoms of anxiety and depression. Studies examining different forms of exercise have also found that aquatic exercise may be particularly beneficial for improving attention and cognitive flexibility.',
        "At C26 Aquatics, we've seen firsthand how swimming can become much more than a sport. It can be an outlet, a confidence builder, a source of belonging, and a place where kids discover what they are capable of achieving.",
        "Swimming is not a replacement for professional medical or psychological care. But we firmly believe that a supportive team environment, meaningful relationships with coaches, purposeful movement, and the confidence that comes from mastering new skills can positively impact a child's overall well-being.",
      ].join('\n\n'),
    },
    {
      blockType: 'richText',
      eyebrow: 'Our home',
      heading: 'One facility. Everything your swimmer needs.',
      body: 'Unlike clubs that rent and rotate pools, we own our home at the C26 Hub inside AdventHealth SportsPark at Bluhawk — a dedicated three-lane lap pool with its own entrance and parking.\n\nConnected to a 10,000-square-foot performance facility for dryland, strength, and recovery — infrared saunas, cold tubs, and compression for swimmers 13 and older.',
      image: hubPoolImg,
      imagePosition: 'left',
    },
    {
      blockType: 'richText',
      eyebrow: 'Beyond the pool',
      heading: "The Midwest's premier open water swimming program",
      body:
        'We believe swimming should create opportunities that extend far beyond the lane lines. Open water is one of the fastest-growing disciplines in the sport — and one of the areas that truly separates C26 Aquatics.\n\n' +
        "Coach Robbie is widely recognized as one of the Midwest's leading open water coaches, with a decade guiding hundreds of swimmers at every level of the sport.\n\n" +
        openWaterCredentials.join(' · '),
      image: openWaterImg,
      imagePosition: 'right',
      buttons: [{ label: 'Read the full story', href: '/our-story', style: 'ink' }],
    },
    {
      blockType: 'ctaBand',
      headingLines: [{ text: "Ready to <span class='hero-accent accent'>join the team</span>?" }],
      buttons: [joinBtn, { label: 'Read our story', href: '/our-story', style: 'paper' }],
      watermark: 'right',
    },
  ],
});

const storyParagraphs = [
  'I started competitive swimming at the age of five and spent more than a decade swimming for Nashville Aquatic Club under legendary coach John Morse. I had success in the water, great teammates, and opportunities that many young swimmers dream about.',
  'Then one day, I climbed out of the pool in the middle of practice and said, "I quit." I was burned out. I was tired. Most importantly, I didn\'t love swimming anymore.',
  'The following year, I watched former teammates and relay partners compete at the Olympic Trials, and I watched one of them go on to win a gold medal at the 1996 Olympics in Atlanta. People often ask if I regret quitting. The answer is no.',
  "In fact, I've often wondered something else: if I had kept swimming and eventually burned out later in life, would I still love the sport today? Would I still swim? Would I have dedicated my life to coaching and helping others experience the joy that swimming can provide?",
  "**Swimming has given me a lifetime of friendships, lessons, opportunities, and purpose. It has shaped who I am. That's exactly why we started C26 Aquatics.**",
  'Over the past decade, I have worked individually with youth swimmers, competitive age-group athletes, collegiate swimmers, and adults of every ability level. Since opening our pool at C26, our staff has coached hundreds of swimmers competing at every level of the sport.',
  'What we kept hearing from parents was simple: "Our kids are getting lost." Too many swimmers in the water. Not enough coaches on deck. Not enough actual coaching. We saw talented athletes struggling with overuse injuries, especially young female swimmers during critical growth and maturation years. We saw kids who didn\'t know their coaches well and teams so large that culture and connection became difficult to build.',
  'We knew there had to be another way. C26 Aquatics was built around a simple idea: every swimmer deserves to be known, coached, and developed as an individual.',
  'We believe swimmers should be challenged without being overwhelmed. They should work hard and pursue excellence without sacrificing their physical health, mental well-being, or love for the sport. We believe in long-term development, meaningful relationships, and creating an environment where every athlete feels seen and valued.',
  "Because our goal isn't simply to help swimmers achieve faster times. Our goal is for your swimmer to love swimming — and to love the person they are becoming through swimming. To gain confidence, resilience, discipline, and friendships that last a lifetime.",
  "Swimming can be demanding. It can sometimes feel lonely. But it doesn't have to be. At C26 Aquatics, we're building something different: a place where swimmers belong, where they are coached with purpose, and where hard work and fun can exist together.",
  '— Coach Robbie Bruce, Founder',
];

await upsertPage('our-story', {
  title: 'Our Story',
  seo: {
    title: 'Our Story | C26 Aquatics',
    description:
      'Why C26 Aquatics exists — founder Robbie Bruce on burnout, the love of the sport, and building a swim team where every swimmer is known, coached, and developed as an individual.',
  },
  layout: [
    {
      blockType: 'hero',
      variant: 'page',
      eyebrow: 'Our Story',
      headline: "Our <span class='hero-accent'>story</span>",
      body: '“I quit swimming so your kid does not have to.”',
    },
    {
      blockType: 'richText',
      heading: '“I quit swimming so your kid does not have to.”',
      body: storyParagraphs.join('\n\n'),
    },
    { blockType: 'richText', body: 'Work Hard. Have Fun. Period.' },
    { blockType: 'testimonials', heading: 'What KC families say', items: testimonialItems },
    {
      blockType: 'ctaBand',
      headingLines: [{ text: "Come <span class='hero-accent accent'>swim with us</span>" }],
      buttons: [joinBtn, { label: 'Read our approach', href: '/our-approach', style: 'paper' }],
      watermark: 'left',
    },
  ],
});

await upsertPage('faq', {
  title: 'FAQ',
  seo: {
    title: 'Frequently Asked Questions | C26 Aquatics',
    description:
      'Answers about the C26 Aquatics competitive swim team, evaluations, meets, and logistics across the Kansas City metro — everything KC swim families ask.',
  },
  layout: [
    {
      blockType: 'hero',
      variant: 'page',
      eyebrow: 'FAQ',
      headline: "Frequently asked <span class='hero-accent'>questions</span>",
      body: 'Quick answers across team, evaluations, and logistics. Can’t find what you’re looking for? Reach out — we’re happy to help.',
    },
    // One faq block per category to preserve the grouped browse-by-topic layout.
    ...(['team', 'logistics', 'general'] as const).map((category) => ({
      blockType: 'faq',
      heading: { team: 'The team', logistics: 'Logistics', general: 'General' }[category],
      items: faqs
        .filter((f) => f.data.category === category)
        .map((f) => ({
          question: f.data.question as string,
          answer:
            cleanBody(f.body) +
            (f.data.cta ? `\n\n[${f.data.cta.label}](${resolveHref(f.data.cta.href)})` : ''),
        })),
    })),
    {
      blockType: 'ctaBand',
      headingLines: [{ text: "Didn’t see your <span class='hero-accent accent'>question?</span>" }],
      text: 'Reach out — we’re happy to help.',
      buttons: [btn('Ask Us', '/contact')],
    },
  ],
});

await upsertPage('contact', {
  title: 'Contact',
  seo: { title: 'Contact | C26 Aquatics' },
  layout: [
    {
      blockType: 'hero',
      variant: 'page',
      eyebrow: 'Contact',
      headline: "One pool. <span class='hero-accent'>One standard.</span>",
      body: 'Everything happens under one roof — no satellites, no rotating rental lanes. Every swimmer trains in the same water with the same staff.',
    },
    // The contact form + map render in the Astro page shell, not from blocks.
  ],
});

// --- Globals -------------------------------------------------------------------

console.log('\n— globals —');
await upsertGlobal('navigation', {
  items: primaryNav.map((n) => ({ label: n.label, href: n.href })),
});

await upsertGlobal('footer', {
  columns: [{ heading: 'Site', links: footerLinks.map((l) => ({ label: l.label, href: l.href })) }],
  social: [
    { platform: 'instagram', href: site.social.instagram },
    { platform: 'facebook', href: site.social.facebook },
    { platform: 'x', href: site.social.twitter },
  ],
  legal: legalLinks.map((l) => ({ label: l.label, href: l.href })),
  contact: {
    phone: site.contact.phoneDisplay,
    email: site.contact.email,
    address: `${site.address.streetAddress}, ${site.address.addressLocality}, ${site.address.addressRegion} ${site.address.postalCode}`,
  },
  copyright: '© C26 Aquatics.',
});

await upsertGlobal('seo-settings', {
  titleTemplate: '%s | C26 Aquatics',
  defaultTitle: 'C26 Aquatics — Competitive Swim Team in Kansas City',
  defaultDescription: site.description,
});

console.log('\nSeed complete.');
