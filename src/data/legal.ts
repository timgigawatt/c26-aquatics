/** The on-site privacy policy. Drafted by pipelines/compliance 2026-11-12 from the
 *  site as built; every [OWNER INPUT: …] is visible text until Tim replaces it.
 *  `published: false` keeps the route out of the build and every privacy link pointing
 *  at the C26 Hub policy. Flipping it to true publishes /privacy-policy/ — Tim's act,
 *  after review — and clients/c26-aquatics/compliance.json → legalPages.privacy then
 *  names the route. Never write "legally compliant". */
export const privacyPolicy = {
  published: false,
  route: '/privacy-policy/',
  externalUrl: 'https://www.c26hub.com/privacy-policy/',
  title: 'Privacy Policy',
  description: 'What this website collects, who receives it, and how to ask about it.',
  effective: '[OWNER INPUT: effective date]',
  reviewed: { date: null as string | null, by: null as string | null },
  sections: [
    {
      heading: 'Who we are',
      body: [
        '[OWNER INPUT: legal business name], 16201 Shawnee Dr Suite 126, Overland Park, KS 66223. Questions about this policy: robbie@c26hub.com or (913) 213-6966.',
      ],
    },
    {
      heading: 'What this website collects',
      body: [
        'When you visit. Our hosting provider, Netlify, records the IP address and the page requested for every visit, as every web host does, to serve the site and keep it secure.',
        'When you send the contact form. The form on our Contact page asks for your name, your email address, what you are interested in (joining the team, a team evaluation, or something else) and your message, so a coach can reply to you. If you write about your swimmer in the message, that is information about a child, sent to us by a parent or guardian; we ask only for what we need to reply.',
      ],
    },
    {
      heading: 'Who receives it',
      body: [
        'Netlify (United States) hosts this website and stores contact-form submissions on our behalf.',
        'We do not sell personal information.',
      ],
    },
    {
      heading: 'Cookies and analytics',
      body: [
        'This site sets no analytics or advertising cookies and loads no analytics unless you choose Accept in the banner; nothing loads before you do, and you can change your choice at any time from the Privacy choices link in the footer. [OWNER INPUT: confirm whether Google Analytics will ever be switched on; today the site is wired for it but no analytics runs.]',
        'The site remembers two things in your browser: your banner choice (c26-consent) and whether you have already seen an announcement (c26-announcement-seen). Neither identifies you.',
      ],
    },
    {
      heading: 'How long we keep it',
      body: [
        'Contact-form submissions: [OWNER INPUT: how long they stay in Netlify and in any copy C26 Aquatics keeps, and how they are deleted].',
      ],
    },
    {
      heading: 'Your choices',
      body: [
        'To see, correct or delete information you sent us, email robbie@c26hub.com. [LEGAL REVIEW: rights language for the jurisdictions C26 Aquatics serves — not written by the agent.]',
      ],
    },
    {
      heading: 'Changes',
      body: ['When this page changes, the effective date at the top changes with it.'],
    },
  ],
} as const;

/** Where every "privacy" link on the site points: the on-site route once published,
 *  the C26 Hub policy until then. */
export const privacyUrl: string = privacyPolicy.published
  ? privacyPolicy.route
  : privacyPolicy.externalUrl;
