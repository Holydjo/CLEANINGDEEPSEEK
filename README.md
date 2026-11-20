# HOLYDJO-CLEAN — CLEANINGDEEPSEEK edition

The website of HOLYDJO-CLEAN, a home cleaning company in Canada. The layout and motion are a
from-scratch design study of [Oboosho](https://www.awwwards.com/sites/oboosho), the Awwwards
Honorable Mention from 2019. The brand, pictures, copy, service names, prices and colours are
HOLYDJO-CLEAN's own. The site is not affiliated with Oboosho or its agency.

**Status: the remake is complete.** See [REMAKE_REPORT.md](./REMAKE_REPORT.md) for the
comparison and the evidence.

## Run it

```bash
npm install
npm run dev
```

`npm run build` writes a static site to `dist/`. `npm run preview` serves that build.

## What is here

| Page | File | Notes |
| --- | --- | --- |
| Home | `index.html` | Hero with booking bar and mascot, three story sections, features, draggable reviews, 20% band |
| Services | `services.html` | Four visit types, checklist, add-ons |
| About | `about.html` | Stats, values, mission |
| Team | `team.html` | Cleaner cards with ratings |
| FAQ | `faq.html` | Animated accordion |
| Contacts | `contacts.html` | Contact form, hours, service area |
| Careers | `careers.html` | Perks, requirements, application form |
| Booking | `booking.html` | Four-step flow with a live price summary, province tax and postal code check |
| Sign in | `signin.html` | Sign in and sign up panel |

The visit types are **Essential**, **Deep Clean**, **The Reset** and **Empty Home**.

## Stack

Vite multi-page build, vanilla JavaScript, GSAP with ScrollTrigger, Draggable and Inertia, and
Lenis for smooth scrolling. No framework and no backend.

## Brand

- **Name and logo.** The name and the logo wordmark are set in `brand` in `src/data.js`. The
  water-drop logo mark is `logoMark` in `src/illustrations.js`.
- **Colours.** Sky blue and white with a sunny accent. The tokens are at the top of
  `src/styles/main.css`.
- **Typefaces.** Manrope and Inter, loaded from Google Fonts.

| Token | Value | Use |
| --- | --- | --- |
| `--blue` | `#0877c8` | Buttons, links, logo |
| `--blue-dark` | `#075a9c` | Hover and deep accents |
| `--blue-light` | `#8fcdf5` | Outlines and soft accents |
| `--bg` | `#f3f7fc` | Page tint |
| `--pink` | `#ffe2ad` | Sunny accent blob |

## Pictures

Every picture is newly made for HOLYDJO-CLEAN. No Oboosho photograph, illustration, person,
logo or text is reused.

- **Photographs.** Eight new scene files live in `public/photos/`. They are art-directed for
  the slot they fill, cropped to the same shape as the picture they replace, and colour-graded
  for the site. The manifest in [docs/PICTURES.md](./docs/PICTURES.md) lists the
  slot, size and prompt for each one. They are stand-ins for real team and client photography;
  the brief supplied no photo folder.
- **Drawings.** The water-drop mascot, logo, feature icons and team avatars are original SVG
  drawings in `src/illustrations.js`. The avatars are illustrations, not photographs of real
  staff.

To use real photographs, drop them into `public/photos/` with the same file names and aspect
ratios, or swap the matching export in `src/illustrations.js` for an `<img>` with the same
class. Each slot keeps its shape through CSS.

## Copy and motion

The section order, the split hero, the booking bar and the review slider follow the reference.
The motion is rebuilt with GSAP, ScrollTrigger, Draggable, Inertia and Lenis: clip reveals,
parallax blobs, staggered text, a preloader that runs once per session, a draggable review
slider and a button ripple.

All headline and body copy is written for HOLYDJO-CLEAN. The reference's text, service names
and prices are not reused. The short headlines are new: “Come home to clean”, “The clean you
keep putting off”, “Every corner, every visit”, “Vetted before they ring”, “Why it works”,
“From our clients”, “Save 20% on repeat visits”.

## Languages: English and French

- **Switch.** An EN / FR button sits in the header, in the menu and in the footer. The choice is
  remembered on the device.
- **First visit.** A browser set to French opens the site in French. Everyone else gets English.
- **Links.** Add `?lang=fr` or `?lang=en` to any page address to force a language.
- **How it works.** English text in the pages and scripts is the source. `src/locales/fr.js`
  holds the French for each English string, and `src/i18n.js` applies it.
- **Formats.** In French, prices read `99,99 $`, taxes are TPS / TVH / TVQ, times read `10 h`,
  and dates and province names are in French.

To change a French sentence, edit its line in `src/locales/fr.js`. When you add or change English
text, add the matching line there too. To find anything left untranslated, open a page in French
and type `__i18nMissing` in the browser console. Names, addresses and text that is already French
show up in that list and can be ignored.

## Region: Canada

The site is configured for Canada. The settings live at the top of `src/data.js`.

- **Currency.** Prices are in Canadian dollars and formatted with the `en-CA` locale.
- **Sales tax.** The `provinces` table sets the tax for each province and territory. The booking
  summary shows each tax on its own line.
- **Address.** The booking form asks for city, province and a Canadian postal code. The postal
  code is checked, formatted as `A1A 1A1`, and used to pick the province.
- **Copy.** Service areas, reviews, careers perks and contact placeholders are written for
  Canada. Edit `serviceAreas` to match the cities you serve.

| Province or territory | Tax applied |
| --- | --- |
| Ontario | HST 13% |
| Nova Scotia | HST 14% |
| New Brunswick, Newfoundland and Labrador, Prince Edward Island | HST 15% |
| Quebec | GST 5% + QST 9.975% |
| Alberta, British Columbia, Manitoba, Saskatchewan, the territories | GST 5% |

## Where to change things

- `src/data.js` starts with `region`, `provinces` and `serviceAreas`, the Canada settings.
- `src/data.js` holds the brand name, contact details, visit types, add-ons, reviews, team and FAQ.
- `src/styles/main.css` holds the design tokens at the top of the file.
- `src/illustrations.js` holds the mascot, logo, icons, avatars and the photo slots.
- `public/photos/` holds the photographs and their manifest.
- `src/locales/fr.js` holds the French translations and `src/i18n.js` the language logic.

## Before going live

- **Photographs.** The scene photographs are generated stand-ins. Replace them with real team
  and client photographs at the same paths.
- **Team.** The names, roles, ratings and avatars are illustrative. Replace them with real staff
  and headshots.
- **Contact details.** Set real ones in `src/data.js`.
- **Forms, booking and sign-in.** They are front-end demos. Nothing is sent or stored.
- **Prices and hours.** The prices and business hours are sample values. Set your own.
- **Reviews and statistics.** The testimonials, rating bars and statistics are sample content.
- **Promo code.** `CLEAN10` exists only to demonstrate the summary.
- **Tax.** The rates are the 2026 rates. Have an accountant confirm them, especially the GST-only
  setting for British Columbia, Manitoba and Saskatchewan.
- **Legal.** A live site needs a privacy policy and consent for marketing email under PIPEDA and
  CASL.
- **French.** Have a French speaker read the text before launch, especially the legal and careers
  wording.
