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
    scheduleOptions: z
      .array(
        z.object({
          label: z.string().optional(), // "Option 1" when >1 option
          slots: z.array(
            z.object({
              day: z.string(),
              time: z.string(),
            }),
          ),
        }),
      )
      .min(1),
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

export const collections = {
  coaches,
  'training-groups': trainingGroups,
  faqs,
  testimonials,
};
