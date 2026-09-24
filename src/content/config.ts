import { defineCollection, reference, z } from 'astro:content';

const coaches = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    headshot: z.string(),
    // One-line hook shown on the card face (the personality line, pulled
    // from the bio). Keeps the collapsed card scannable.
    tagline: z.string().optional(),
    // Training groups this coach leads, as validated references — array order
    // is the chip display order. Each chip links to /team#<slug>.
    groups: z.array(reference('training-groups')).default([]),
    // Non-group programs (e.g. "Strength", "Open Water") — unlinked chips
    // rendered after the group chips.
    programs: z.array(z.string()).default([]),
    // Career highlights surfaced as a bullet list inside the bio dialog —
    // the résumé facts otherwise buried in the prose.
    highlights: z.array(z.string()).default([]),
    credentials: z.array(z.string()).default([]),
    usaSwimmingMember: z.boolean().default(false),
    safeSportCertified: z.boolean().default(false),
    order: z.number(),
  }),
});

// `slug` is intentionally omitted — Astro reserves that field and derives it
// from the filename. Downstream callers should use `entry.slug`.
const trainingGroups = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    ageRange: z.string(), // "5–8 yrs"
    groupSize: z.number(),
    suggestedPractices: z.string(), // "2×/week", "2–3×/week"
    monthlyHours: z.number(), // avg hrs / month
    monthlyCost: z.number(), // USD
    costPerHour: z.number(), // USD, stored for display
    commitmentLevel: z.enum(['developmental', 'competitive', 'elite']),
    // Roster availability. `full` swaps the group's registration path for an
    // email-first availability check; `limited` keeps registration active but
    // surfaces a register-soon callout; anything else renders as open.
    status: z.enum(['open', 'limited', 'full']).default('open'),
    // Optional override for the availability callout copy shown when
    // full/limited.
    statusNote: z.string().optional(),
    // Momence checkout links, rendered as Register — Monthly / Seasonal
    // buttons (suppressed when the group is `full`).
    registration: z
      .object({
        monthly: z.string().url(),
        seasonal: z.string().url(),
      })
      .optional(),
    scheduleOptions: z
      .array(
        z.object({
          label: z.string().optional(), // "Option 1" when >1 option
          // Per-option availability, shown on the option toggle. Distinct
          // from group `status`: a group stays registrable while individual
          // options fill up.
          status: z.enum(['open', 'limited', 'full']).optional(),
          // One-liner under the slots for the selected option,
          // e.g. "Tons of availability".
          statusNote: z.string().optional(),
          slots: z.array(
            z.object({
              day: z.string(),
              time: z.string(),
            }),
          ),
        }),
      )
      .min(1),
    // Practices that sit outside the option split and are open to every
    // option (Novice/Advanced Friday and Saturday sessions). Rendered as its
    // own block under the option panels so the times stay visible whichever
    // option is selected.
    sharedSchedule: z
      .object({
        label: z.string(),
        note: z.string().optional(),
        slots: z.array(
          z.object({
            day: z.string(),
            time: z.string(),
          }),
        ),
      })
      .optional(),
    prerequisites: z.array(z.string()).default([]),
    order: z.number(),
  }),
});

const faqs = defineCollection({
  type: 'content',
  schema: z.object({
    question: z.string(),
    category: z.enum(['team', 'logistics', 'general']),
    surfaces: z
      .array(z.enum(['home', 'team', 'faq']))
      .min(1),
    order: z.number(),
    // Optional CTA button rendered after the answer. `href: "booking.team"`
    // resolves to `site.booking.team` so the URL stays single-sourced.
    cta: z
      .object({
        label: z.string(),
        href: z.string(),
      })
      .optional(),
  }),
});

const testimonials = defineCollection({
  type: 'content',
  schema: z.object({
    quote: z.string(),
    author: z.string(),
    role: z.string(),
    featured: z.boolean().default(false),
    order: z.number(),
  }),
});

/**
 * Scheduled announcements — popup on first visit, then a banner above the
 * header until `endDate` passes. Body markdown is the popup text.
 *
 * Decap CMS (future): map this folder as a collection with media folder
 * `public/uploads`; fields are string, image, datetime ×2, boolean, body.
 */
const announcements = defineCollection({
  type: 'content',
  schema: z
    .object({
      title: z.string(),
      // Path under /public, e.g. "/uploads/clinic.jpg" — Decap's future
      // media folder, so paths authored today stay valid.
      image: z.string().optional(),
      imageAlt: z.string().optional(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
      // Kill-switch without deleting the file.
      draft: z.boolean().default(false),
    })
    .refine((a) => !a.image || a.imageAlt, {
      message: 'imageAlt is required when image is set',
    })
    .refine((a) => a.endDate > a.startDate, {
      message: 'endDate must be after startDate',
    }),
});

export const collections = {
  coaches,
  'training-groups': trainingGroups,
  faqs,
  testimonials,
  announcements,
};
