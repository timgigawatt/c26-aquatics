# C26 Aquatics — Contact Page (option 1a) handoff

Files:
- `contact-page.html` — self-contained page (fonts + images embedded). Opens in any browser, works offline. Drop it on any host as-is or paste its sections into your site.
- `contact-page-src.html` — the same page in editable form: readable CSS at the top, images referenced from an `assets/` folder (bring `kraken-white.png` alongside it if you use this version).

## Making the form actually send

The form currently shows a demo "Message sent" state without sending anything. To wire it up, pick one:

1. **Formspree (easiest, no code)** — create a free form at formspree.io, then set
   `action="https://formspree.io/f/YOUR_ID"` on the `<form>` and delete the `<script>` block at the bottom.
2. **Netlify Forms** — if hosting on Netlify, add `data-netlify="true"` to the `<form>` and delete the script block.
3. **Your own backend** — POST fields `name`, `email`, `interest`, `message` to your endpoint; on success, hide the form and unhide the `#sent` div (the script shows how).

## Placeholders to replace

- Address, hours, phone: search for `0000 Example Pkwy`, `(913) 000-0000`.
- Email: `hello@c26aquatics.com` (appears twice — the link and its text).
- Striped grey box: swap for a facility map or exterior photo (`<img>` or an embedded Google Map, ~260px tall, `border-radius:14px`).

## Brand reference

- Fonts: Barlow (body), Barlow Condensed (display, 700/800), Barlow Semi Condensed (labels/eyebrows, 600).
- Colors: navy `#0e1330` / `#242b6e`, blue `#2f63ef`, cyan `#2fd0e0`, magenta `#e3267e`, orange CTA `#f38f1f` (text `#3a2202`), body text `#2c3f49`, borders `#d7e0e5`.
- Buttons: Barlow Condensed 700, uppercase, 2px corner radius, orange with soft orange shadow.

## Accessibility notes

- All inputs have visible labels; name/email/message are `required`; email validates format natively.
- Keep the success message in the same spot as the form so screen-reader focus order stays sensible.
