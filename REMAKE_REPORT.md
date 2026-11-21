# Remake report — HOLYDJO-CLEAN

**Status: REMAKE COMPLETE**

- **Reference:** [Oboosho on Awwwards](https://www.awwwards.com/sites/oboosho), Honorable
  Mention, 1 May 2019.
- **Target repository:** <https://github.com/Holydjo/CLEANINGDEEPSEEK>
- **Remake:** HOLYDJO-CLEAN, a home cleaning company in Canada.
- **Completed:** 20 November 2026.

The reference is used as a design study only. No Oboosho photograph, illustration, person,
logo, or copy is used on the site. The only places the name Oboosho appears are this report,
the README and the picture notes, where it is cited as the reference.

## 1. How the reference was studied

The live domain no longer serves the 2019 site, so the reconstruction used three sources:

- The Awwwards entry and its 918 × 656 hero screenshot, for the hero composition, header,
  booking bar and palette.
- The Wayback Machine capture of `oboosho.com` from 14 June 2019, rendered in a browser, for
  the section order, navigation, footer and the responsive shell.
- The archived bundle and stylesheet, for the type scale, colour tokens, blob shapes, spacing
  and easing curves.

The Bounds case study of the project was also read for the character and palette rationale. The
reference's inner pages were never archived; their structure here is reconstructed from the
navigation and the section names in the bundle.

## 2. What was rebuilt

| Area | Reference | Remake |
| --- | --- | --- |
| Header | Wordmark + tagline, black login pill, three-dot menu | Same structure and behaviour; dots morph to a close mark |
| Menu | Full-screen overlay, contacts and hours, large links | Same, with staggered reveal and a close control |
| Hero | Headline left, mascot right, three selectors and a live price | Same split and behaviour; new copy, new mascot, new price logic |
| Sections | Meet, services, cleaners, features, reviews, 20% band | Same order and rhythm; new pictures and copy |
| Reviews | Draggable slider with rating bars | Draggable with inertia and snap, arrows, rating bars |
| Preloader | Blue disc, waving glove, percentage | New disc and water-drop mark, runs once per session |
| Motion | GSAP reveals, parallax, clip reveals, smooth scroll | Rebuilt with GSAP 3, ScrollTrigger, Draggable, Inertia and Lenis |
| Inner pages | Services, about, team, FAQ, contacts, careers, booking, sign-in | Nine working pages, same navigation model |
| Booking | Multi-step flow with live summary | Four steps, live summary, provincial tax, postal-code validation, confirmation |
| Responsive | Fluid desktop, stacked mobile | 1440 and 390 checked; no horizontal overflow |

## 3. What is deliberately new

### Brand and palette

The brief specifies blue and black. No hex values were supplied, so the remake uses the
established HOLYDJO-CLEAN blue `#0877c8`, deep blue `#075a9c`, pale blue `#8fcdf5` and black
`#000000` on an airy blue-white canvas `#f3f6fa`. The first draft's sunny third accent has been
removed; the photographic grade is cool daylight, and black carries the booking bar, login pill
and the closing CTA band. The reference's indigo, lavender and rose are not used as brand
colours.

### Copy

All headline and body copy is newly written. The reference's distinctive lines are not reused:

| Reference | Remake |
| --- | --- |
| “Get your life back!” | “Come home to clean.” |
| “Cleaning Services for a Busy Lifestyle” | “The clean you keep putting off.” |
| “We Don’t Miss a Thing” | “Every corner, every visit.” |
| “Trusted. Thorough. Dependable.” | “Vetted before they ring.” |
| “Our Features” | “Why it works” |
| “Client feedback” | “From our clients” |
| “Get up to 20% Off!” | “Save 20% on repeat visits” |
| “Schedule Today!” | “Book a visit” |
| “Meet Our Cleaners” | “The people you let in” |
| “Meet oboosho” | “Who we are” |

The four visit types are renamed **Essential**, **Deep Clean**, **The Reset** and **Empty Home**.
The starting price is CAD 99.99, the durations are 2–3, 3–4, 6–7 and 7–8 hours, and the business
hours are 7am–8pm and 8am–4pm. None of the reference's prices or service names are carried over.

### Pictures

Every picture slot has a new picture made for HOLYDJO-CLEAN. There is no original image file in
the repository and no hotlink to Oboosho or Awwwards.

| Slot | Reference picture | New picture | Shape, light and colour |
| --- | --- | --- | --- |
| Hero, right | Glossy 3D purple dinosaur with a vacuum, bottom-anchored, soft studio shadow | “Djo”, an original water-drop mascot in an apron with a mop, bottom-anchored, soft blue shadow | Same tall right-hand placement and bottom crop; same soft studio falloff; brand blue instead of purple |
| Meet, right | `clean.jpg`, a cleaning scene in the colour block | New sunlit living room, linen sofa and plant, 5:4 card | Same right-hand colour-block slot; soft window light with a cool grade |
| Services, left | Cleaning still life in a tall frame | New close-up of a gloved hand polishing a table with a blue cloth, 4:5 | Same tall portrait slot; soft daylight, blue accent |
| Cleaners, right | `hand.png`, a cut-out cleaning hand | New pair of cleaners in blue uniforms, seen from behind, in a circle | Same circular right-hand slot; natural light, anonymous faces |
| Features | Four outlined icons | Four new two-tone icons (booking, shield, key, price tag) | Same grid, same optical weight |
| Reviews | No photograph; initials | Custom initial avatars | Same card size and colour balance |
| Team grid | Cleaner portraits | Eight original illustrated avatars in the brand uniform | Same 4:5 portrait crop and four-column grid |
| Team page hero | Page illustration | New `team-hero.jpg`, the same shoot in a 5:4 crop | Same top-right page slot |
| About hero / mission | Page illustration / colour block | New kitchen and living-room photographs | Same corner and colour-block slots |
| Services hero | Page illustration | New supplies still life | Same top-right page slot |
| Contacts hero | Page illustration | New entryway photograph | Same top-right page slot |
| Logo, favicon, loader | Oboosho wordmark and glove | New water-drop mark and wordmark, new favicon and loader | Same positions and sizes |

The picture set is documented in [docs/PICTURES.md](./docs/PICTURES.md). The scene photographs
were generated for this project with an open text-to-image model, then cropped to the slot and
colour-graded for the blue and black brand. The brief supplied no photo folder and none was present in the workspace, so the
photographs are stand-ins for the client's own team and client photography. They can be replaced
file-for-file in `public/photos/` without layout changes. The mascot, logo, icons and team
avatars are original vector drawings; the avatars are illustrations, not photographs of real
staff.

## 4. Verification

Tested against the production build (`npm run build`, `npm run preview`) in headless Chromium.

| Check | Result |
| --- | --- |
| Production build | Passes; nine pages emitted |
| All nine pages return 200 | Yes |
| Console or page errors | None |
| Failed network requests | None |
| Broken images | None |
| Desktop horizontal overflow, 1440 px | 0 px on every page |
| Mobile horizontal overflow, 390 px | 0 px on every page |
| Hero selectors update the price | Studio → 2 Bedroom changes the button from `$99.99` to `$139.99` |
| Menu opens and closes | Yes; `aria-expanded` follows |
| Reviews slider | Next moves the track 799 px |
| FAQ accordion | Opens; first answer height 74 px |
| Booking flow | Reaches review and confirmation; total changes from `$112.99` to `$158.19` when the home size changes |
| Booking validation | Postal code, e-mail, phone and required fields checked |
| Sign in / sign up | Tab switches; the name field appears |
| French | `lang="fr-CA"`; title and hero translate; `__i18nMissing` contains only names, addresses and already-French strings |
| Copy audit | No reference headline or service name found in the HTML or scripts |
| Repository audit | `npm run audit` passes all link, picture, report and hotlink checks |
| Asset audit | No `oboosho.com` or `assets.awwwards.com` references in the site |

Screenshots of the finished pages are in [`docs/screens/`](./docs/screens/): nine desktop pages
and the home, services, team and booking pages at 390 px.

## 5. Not verified

- Safari and Firefox. Testing was done in headless Chromium only.
- Physical iOS and Android devices.
- Tablet widths between 768 and 1100 px were not screenshotted.
- Lighthouse, axe and a full accessibility audit were not run. The build keeps semantic
  headings, labelled form fields, focus styles and a reduced-motion path, but this is not a
  formal audit.
- The French text was written without a native review.
- Real photography and real staff headshots are still needed.
- Forms, booking and sign-in are front-end demos. Nothing is sent, stored or charged.
- The scene photographs are generated stand-ins, not photographs of real people's homes.

## 6. Sign-off

The reference has been studied, the structure and motion rebuilt, the copy and service model
rewritten, every picture replaced with a new one made for HOLYDJO-CLEAN, the build and the main
interactions verified, and the result is ready for the client's real photography and contact
details.

**REMAKE COMPLETE**
