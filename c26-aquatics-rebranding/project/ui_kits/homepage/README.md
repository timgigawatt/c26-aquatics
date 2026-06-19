# Homepage UI kit — Option B (athletic)

Hi-fi recreation of the approved **Option B** homepage direction: full-bleed hero, mega-menu navigation, a navy stats/proof band, audience-tab program selector, differentiators, coaches, testimonial, KC service area, and a final CTA.

## Files
- `index.html` — mounts the interactive page (the `@dsCard` preview).
- `HomeView.jsx` — the full composed page, exported as `HomeView`. Sections are factored into local components (`Nav`, `Hero`, `Stats`, `Selector`, `Why`, `Coaches`, `Testimonial`, `ServiceArea`, `FinalCTA`, `Footer`).

## Composes
`Button`, `Badge`, `Card`, `StatBlock`, `Tabs` from the design system.

## Interactions
- **Programs** mega-menu opens on hover/click in the nav.
- **Audience tabs** (Kids / Teens / Adults / Athletes) swap the program cards live.

## Placeholders
All photography is hatched placeholder blocks labelled with their intended subject (hero, coach portraits, KC map). Swap in real imagery via `Card`'s `media` prop and the `Photo` blocks.
