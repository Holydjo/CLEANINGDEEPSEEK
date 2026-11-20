/* Content model for the remake. Section order and headline tone follow the original site; body copy is written fresh. */

import { t, locale } from './i18n.js';

/* Regional settings. The site is configured for Canada: Canadian dollars, en-CA dates,
   GST / HST / QST by province, and Canadian postal codes. */
export const region = {
  country: 'Canada',
  countryCode: 'CA',
  /* en-CA or fr-CA, following the language in use. */
  locale,
  currency: 'CAD',
  timezone: t('ET'),
  hq: 'Toronto, ON',
  defaultProvince: 'ON',
};

/* Sales tax charged on a residential cleaning, by province or territory.
   Rates are the ones in force in 2026. HST provinces charge one harmonized tax. Quebec charges GST plus QST.
   British Columbia, Saskatchewan and Manitoba are set to GST only, because their provincial sales taxes
   generally do not apply to residential cleaning. Confirm every line with an accountant before charging customers. */
const GST = { label: t('GST'), rate: 0.05 };
export const provinces = [
  { id: 'AB', name: t('Alberta'), taxes: [GST] },
  { id: 'BC', name: t('British Columbia'), taxes: [GST] },
  { id: 'MB', name: t('Manitoba'), taxes: [GST] },
  { id: 'NB', name: t('New Brunswick'), taxes: [{ label: t('HST'), rate: 0.15 }] },
  { id: 'NL', name: t('Newfoundland and Labrador'), taxes: [{ label: t('HST'), rate: 0.15 }] },
  { id: 'NS', name: t('Nova Scotia'), taxes: [{ label: t('HST'), rate: 0.14 }] },
  { id: 'NT', name: t('Northwest Territories'), taxes: [GST] },
  { id: 'NU', name: t('Nunavut'), taxes: [GST] },
  { id: 'ON', name: t('Ontario'), taxes: [{ label: t('HST'), rate: 0.13 }] },
  { id: 'PE', name: t('Prince Edward Island'), taxes: [{ label: t('HST'), rate: 0.15 }] },
  { id: 'QC', name: t('Quebec'), taxes: [GST, { label: t('QST'), rate: 0.09975 }] },
  { id: 'SK', name: t('Saskatchewan'), taxes: [GST] },
  { id: 'YT', name: t('Yukon'), taxes: [GST] },
];

/* Canadian postal codes look like "M5V 2T6". The first letter identifies the province or territory. */
const POSTAL_RE = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;
const POSTAL_PROVINCE = { A: 'NL', B: 'NS', C: 'PE', E: 'NB', G: 'QC', H: 'QC', J: 'QC', K: 'ON', L: 'ON', M: 'ON', N: 'ON', P: 'ON', R: 'MB', S: 'SK', T: 'AB', V: 'BC', X: 'NT', Y: 'YT' };
export const isPostalCode = (v) => POSTAL_RE.test(String(v).trim());
export const formatPostalCode = (v) => {
  const c = String(v).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6);
  return c.length > 3 ? `${c.slice(0, 3)} ${c.slice(3)}` : c;
};
export const provinceFromPostalCode = (v) => POSTAL_PROVINCE[String(v).trim().charAt(0).toUpperCase()] || null;

/* Sample service areas. Replace with the cities you actually serve. */
export const serviceAreas = [
  { city: 'Toronto', province: 'ON', note: t('City and GTA') },
  { city: 'Montréal', province: 'QC', note: t('Island and Laval') },
  { city: 'Vancouver', province: 'BC', note: t('Metro Vancouver') },
  { city: 'Calgary', province: 'AB', note: t('All quadrants') },
  { city: 'Ottawa', province: 'ON', note: t('Ottawa and Gatineau') },
  { city: 'Halifax', province: 'NS', note: t('Halifax and Dartmouth') },
];

export const brand = {
  name: 'HOLYDJO-CLEAN',
  /* Wordmark markup for the logo: the second half is tinted with the brand blue. */
  wordmark: 'HOLYDJO<b>-CLEAN</b>',
  tagline: t('Home cleaning services'),
  /* Placeholder contact details. Replace with your own before going live. */
  email: 'hello@example.com',
  phone: '(416) 555-0142',
  phoneHref: 'tel:+14165550142',
  hours: [
    { days: t('Monday — Friday'), time: t('7am — 8pm') },
    { days: t('Saturday — Sunday'), time: t('8am — 4pm') },
  ],
};

export const nav = [
  { href: 'services.html', label: t('Services') },
  { href: 'about.html', label: t('About us') },
  { href: 'team.html', label: t('Team') },
  { href: 'faq.html', label: t('FAQ') },
  { href: 'contacts.html', label: t('Contacts') },
];

export const bedrooms = [
  { id: 1, label: t('Studio'), add: 0 },
  { id: 2, label: t('1 Bedroom'), add: 20 },
  { id: 3, label: t('2 Bedroom'), add: 40 },
  { id: 4, label: t('3 Bedroom'), add: 60 },
  { id: 5, label: t('4 Bedroom'), add: 85 },
  { id: 6, label: t('5 Bedroom'), add: 110 },
];

export const bathrooms = [
  { id: 7, label: t('1 Bathroom'), add: 0 },
  { id: 8, label: t('2 Bathroom'), add: 15 },
  { id: 9, label: t('3 Bathroom'), add: 30 },
  { id: 10, label: t('4 Bathroom'), add: 45 },
];

export const cleaningTypes = [
  {
    id: 17,
    label: t('Essential'),
    hours: t('2 — 3 hours'),
    desc: t('Our basic clean. Dust, wipe down and scrub every room.'),
    base: 99.99,
    includes: ['All rooms dusted and wiped', 'Floors vacuumed and mopped', 'Kitchen counters and appliance exteriors', 'Bathrooms scrubbed and sanitized', 'Trash removed'].map((x) => t(x)),
  },
  {
    id: 18,
    label: t('Deep Clean'),
    hours: t('3 — 4 hours'),
    desc: t('A deeper pass for homes that need extra attention.'),
    base: 139.99,
    includes: ['Everything in Essential', 'Baseboards and door frames', 'Inside microwave', 'Light switches and handles', 'Ceiling corners and vents'].map((x) => t(x)),
    featured: true,
  },
  {
    id: 19,
    label: t('The Reset'),
    hours: t('6 — 7 hours'),
    desc: t('Top-to-bottom detail work, the once-a-season reset.'),
    base: 219.99,
    includes: ['Everything in Deep Clean', 'Inside fridge and oven', 'Inside cabinets', 'Window interiors and sills', 'Behind and under furniture'].map((x) => t(x)),
  },
  {
    id: 20,
    label: t('Empty Home'),
    hours: t('7 — 8 hours'),
    desc: t('An empty-apartment clean built for deposits and fresh starts.'),
    base: 259.99,
    includes: ['Everything in The Reset', 'Inside all closets and drawers', 'Wall spot cleaning', 'Appliance deep clean', 'Final walkthrough checklist'].map((x) => t(x)),
  },
];

export const addons = [
  { id: 'fridge', label: t('Inside Fridge'), price: 35 },
  { id: 'oven', label: t('Inside Oven'), price: 35 },
  { id: 'cabinets', label: t('Inside Cabinets'), price: 35 },
  { id: 'laundry', label: t('Laundry & Fold'), price: 25 },
  { id: 'windows', label: t('Interior Windows'), price: 30 },
  { id: 'organizing', label: t('Light Organizing'), price: 40 },
];

export const frequencies = [
  { id: 'once', label: t('One time'), discount: 0 },
  { id: 'weekly', label: t('Weekly'), discount: 0.2 },
  { id: 'biweekly', label: t('Bi-weekly'), discount: 0.15 },
  { id: 'monthly', label: t('Monthly'), discount: 0.1 },
];

const checklistEn = {
  'Wipe Dust': ['Shelves and surfaces', 'Picture frames', 'Lamps and fixtures', 'Blinds', 'Ceiling fans'],
  'Wipe Down': ['Counters and tables', 'Appliance exteriors', 'Cabinet fronts', 'Mirrors', 'Door handles'],
  Scrub: ['Sinks and faucets', 'Showers and tubs', 'Toilets', 'Stovetop', 'Tile and grout'],
  'We also do': ['Vacuum and mop floors', 'Make beds', 'Take out trash and recycling', 'Load the dishwasher', 'Cobwebs in ceiling corners'],
};

export const checklist = Object.fromEntries(Object.entries(checklistEn).map(([k, v]) => [t(k), v.map((x) => t(x))]));

export const notes = ['Leave clean sheets on the bed if you want it changed', 'Please sort recycling before we arrive', 'Add-ons are already part of The Reset and Empty Home', 'Prices are in Canadian dollars, before GST / HST'].map((x) => t(x));

export const features = [
  { icon: 'book', title: t('Book and manage\nonline') },
  { icon: 'shield', title: t('Bonded and\ninsured') },
  { icon: 'lock', title: t('Your data stays\nprivate') },
  { icon: 'repeat', title: t('Save on repeat\nvisits') },
];

/* Sample testimonials written for the remake. */
export const reviews = [
  { name: 'Maya R.', where: 'The Annex, Toronto', stars: 5, text: t('Booked at 11pm, cleaner arrived the next morning on the dot. My apartment has never looked like this. The oven add-on was worth every cent.') },
  { name: 'Daniel K.', where: 'Plateau-Mont-Royal, Montréal', stars: 5, text: t('I have tried four services in Montréal. This is the only one where the same person comes back every two weeks and remembers how I like things.') },
  { name: 'Priya S.', where: 'Kitsilano, Vancouver', stars: 5, text: t('The Empty Home visit got my full deposit back. The landlord literally asked who did it.') },
  { name: 'Tom & Elise', where: 'Beltline, Calgary', stars: 4, text: t('Thorough and friendly. Rescheduling from the dashboard took ten seconds when our plans changed.') },
  { name: 'Jordan W.', where: 'The Glebe, Ottawa', stars: 5, text: t('Dependable is the right word. Two years, zero no-shows. The recurring discount makes it easy to keep.') },
  { name: 'Sofia M.', where: 'Leslieville, Toronto', stars: 5, text: t('We booked The Reset before my parents visited. They noticed the baseboards. Nobody notices baseboards.') },
];

export const team = [
  { name: 'Rosa M.', role: t('Senior cleaner · 4 yrs'), rating: 4.9, jobs: 612, seed: 1 },
  { name: 'Kwame A.', role: t('Senior cleaner · 3 yrs'), rating: 4.9, jobs: 540, seed: 2 },
  { name: 'Lena P.', role: t('Cleaner · 2 yrs'), rating: 4.8, jobs: 318, seed: 3 },
  { name: 'Diego F.', role: t('Move-out specialist'), rating: 5.0, jobs: 274, seed: 4 },
  { name: 'Anika B.', role: t('Cleaner · 2 yrs'), rating: 4.8, jobs: 290, seed: 5 },
  { name: 'Marcus T.', role: t('Team lead · Toronto'), rating: 4.9, jobs: 701, seed: 6 },
  { name: 'Hana O.', role: t('Cleaner · 1 yr'), rating: 4.7, jobs: 142, seed: 7 },
  { name: 'Yusuf E.', role: t('Cleaner · 3 yrs'), rating: 4.9, jobs: 455, seed: 8 },
];

export const faq = [
  { q: t('How do I book a cleaning?'), a: t('Pick your apartment size and cleaning type on the home page, choose a date and time, and tell us how to get in. You can book in under two minutes and manage everything from your account.') },
  { q: t('Do I need to be home?'), a: t('No. Most clients leave a key with the concierge or share an entry code. Tell us how we should get in when you book, and we will handle the rest.') },
  { q: t('What is included in an Essential clean?'), a: t('Every room dusted and wiped down, floors vacuumed and mopped, kitchen counters and appliance exteriors cleaned, bathrooms scrubbed and sanitized, and trash removed. See the Services page for the full checklist.') },
  { q: t('Do you bring supplies?'), a: t('Yes. Our cleaners arrive with professional, eco-friendly supplies and equipment. If you prefer we use your own products, leave them out and let us know in the booking notes.') },
  { q: t('Are your cleaners background checked?'), a: t('Every member of the team is hand-selected, police record checked by an independent provider, interviewed in person and trained before their first job.') },
  { q: t('How does the recurring discount work?'), a: t('Schedule weekly cleanings from your account and save 20%. Bi-weekly saves 15% and monthly saves 10%. The discount is applied automatically to every visit.') },
  { q: t('What if I need to reschedule?'), a: t('Reschedule or cancel from your account up to 24 hours before the appointment at no charge.') },
  { q: t('Which areas do you cover?'), a: t('{cities}, with more Canadian cities on the way. Studios to five-bedroom homes.', { cities: new Intl.ListFormat(locale, { style: 'long', type: 'conjunction' }).format(serviceAreas.map((x) => x.city)) }) },
  { q: t('Are prices in Canadian dollars?'), a: t('Yes. Every price on the site is in Canadian dollars. GST, HST or QST for your province is added at checkout and shown before you confirm.') },
  { q: t('What if something is not right?'), a: t('Tell us within 24 hours and we will come back and make it right, free of charge. That is our promise to you.') },
];

export const perks = [
  'Hourly pay from $22, paid every two weeks',
  'Employee status with a T4, CPP and EI handled',
  "Provincial workers' compensation coverage",
  'Vacation pay and paid sick days',
  'Travel time between jobs is paid',
  'Overtime under provincial employment standards',
  'Group RRSP with employer match',
  'Monthly and yearly bonuses',
  'Uniform and supplies provided',
].map((x) => t(x));

export const requirements = ['Legally entitled to work in Canada', 'At least one year of professional cleaning experience', 'Pass a police record check', 'Reliable, detail-oriented and friendly', 'Comfortable using a smartphone app for scheduling'].map((x) => t(x));

const cad = new Intl.NumberFormat(region.locale, { style: 'currency', currency: region.currency });
export const money = (n) => cad.format(n);
const round2 = (n) => Math.round(n * 100) / 100;
/* Whole-dollar amount, e.g. "$35" or "35 $". */
const cad0 = new Intl.NumberFormat(region.locale, { style: 'currency', currency: region.currency, maximumFractionDigits: 0 });
export const money0 = (n) => cad0.format(n);
/* Rate as a percentage label, e.g. 0.09975 -> "9.975%" or "9,975 %". */
const percent = new Intl.NumberFormat(region.locale, { style: 'percent', maximumFractionDigits: 3 });
export const pct = (rate) => percent.format(rate);
/* One-decimal number, e.g. a 4.9 rating. */
const one = new Intl.NumberFormat(region.locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
export const num1 = (n) => one.format(n);

export function quote({ bedroomId = 1, bathroomId = 7, typeId = 17, addonIds = [], frequencyId = 'once', promo = '', provinceId = region.defaultProvince } = {}) {
  const bed = bedrooms.find((b) => b.id === Number(bedroomId)) || bedrooms[0];
  const bath = bathrooms.find((b) => b.id === Number(bathroomId)) || bathrooms[0];
  const type = cleaningTypes.find((t) => t.id === Number(typeId)) || cleaningTypes[0];
  const freq = frequencies.find((f) => f.id === frequencyId) || frequencies[0];
  const chosen = addons.filter((a) => addonIds.includes(a.id));
  const addonTotal = type.id >= 19 ? 0 : chosen.reduce((s, a) => s + a.price, 0);
  const subtotal = type.base + bed.add + bath.add + addonTotal;
  const discountRate = freq.discount + (promo.trim().toUpperCase() === 'CLEAN10' ? 0.1 : 0);
  const discount = subtotal * discountRate;
  const taxed = subtotal - discount;
  const province = provinces.find((p) => p.id === provinceId) || provinces.find((p) => p.id === region.defaultProvince);
  const taxes = province.taxes.map((t) => ({ ...t, amount: round2(taxed * t.rate) }));
  const tax = taxes.reduce((s, t) => s + t.amount, 0);
  return { bed, bath, type, freq, chosen, addonTotal, subtotal, discountRate, discount, province, taxes, tax, total: round2(taxed + tax) };
}
