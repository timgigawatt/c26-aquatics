# Announcements: popup + banner

**Date:** 2026-07-16
**Status:** Approved

## Goal

Let the client publish scheduled announcements. A visitor's first
encounter is a popup (image + markdown text, dismissable); after
dismissal the announcement lives as a slim banner above the header on
every page until its end date. CMS-ready: the data model must drop into
Decap CMS unchanged when that lands.

## Decisions

- Popup shows once per visitor (localStorage), then banner.
- Media: optional image only (no video).
- One announcement live at a time — newest `startDate` wins.
- Banner persists until `endDate`; not dismissable.

## Data model

New content collection `src/content/announcements/`, one markdown file
per announcement:

```yaml
title: "Summer Open Water Clinic"   # required — popup heading + banner text
image: "/uploads/ow-clinic.jpg"     # optional, under /public
imageAlt: "..."                     # required when image present
startDate: 2026-07-20
endDate: 2026-08-01                 # popup + banner both die after this
draft: false                        # kill-switch without deleting
---
Markdown body shown in the popup.
```

Images live in `public/uploads/` — Decap's future media folder, so
paths authored now stay valid.

Selection: at build, all non-draft announcements with future `endDate`
are embedded, sorted newest-`startDate` first. At runtime, JS picks the
first whose window contains now. Scheduled-ahead announcements appear
on time without a rebuild; expired ones disappear on time too.

## Components

`AnnouncementHost.astro`, mounted once in `Base.astro`:

- **Popup** — native `<dialog>` (same pattern as coach bio dialogs):
  optional image, title, rendered markdown body, "Got it" button + ×.
  Opens ~600ms after load. Esc / backdrop / button all dismiss.
- **Banner** — slim strip above the header, navy with teal accent:
  title + "Read more" (reopens the popup). No dismiss.
- **Lifecycle** — localStorage `c26-announcement-seen:<slug>`. No key →
  popup (dismissal sets it). Key → banner. Past end date → nothing,
  and stale keys are cleaned up. New announcement = new slug = fresh
  popup automatically.

## Edge cases & a11y

- JS disabled → nothing renders (markup ships `hidden`).
- localStorage blocked → popup each visit; acceptable.
- Dialog `aria-labelledby` title; banner `role="region"`
  aria-label "Announcement"; no animation under
  `prefers-reduced-motion`.
- ~40 lines inline vanilla JS; popup image `loading="lazy"`.

## Decap path (future, not built now)

Add to `config.yml`: collection folder `src/content/announcements`,
media folder `public/uploads`, fields = string, image, datetime ×2,
boolean, markdown body. Noted in the collection's comment block.

## Seed content

One `draft: true` example file as an authoring template.

## Verification

Build; then in the browser: popup on first visit → dismiss → banner on
every page, no popup on reload, nothing once `endDate` is past.
