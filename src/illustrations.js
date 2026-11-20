/*
  HOLYDJO-CLEAN illustration set.
  Every picture on the site is drawn here from scratch for the brand:
  a sky-blue water-drop mascot with a mop, three scenes, feature icons,
  team portraits, the logo mark and the loader mark.
  Palette: sky blue #0877c8 / #4db8f5 / #a9e2ff, white, and a sunny accent #ffd36b.
*/

/* Logo mark: a water drop with a shine. Coloured by CSS through currentColor. */
export const logoMark = `<svg class="mark" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M16 2.5c-2.6 5.6-9.5 10.4-9.5 17a9.5 9.5 0 0019 0c0-6.600-6.900-11.400-9.500-17z" fill="currentColor"/><path d="M11.200 20.500c0-2.400 1.300-4.300 3.100-5.600" fill="none" stroke="#fff" stroke-width="2.200" stroke-linecap="round" opacity=".9"/><path d="M24.500 3l.9 2.300 2.300.9-2.300.9-.9 2.300-.9-2.300-2.300-.9 2.300-.9z" fill="#ffd36b"/></svg>`;

/* Mascot: "Djo", a water drop in a white apron holding a mop. */
export const mascot = `
<svg class="mascot" viewBox="0 0 560 620" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="m-body" x1="170" y1="90" x2="420" y2="580" gradientUnits="userSpaceOnUse">
      <stop stop-color="#b9e8ff"/>
      <stop offset=".5" stop-color="#58bef7"/>
      <stop offset="1" stop-color="#1c95e3"/>
    </linearGradient>
    <linearGradient id="m-pole" x1="0" y1="0" x2="1" y2="0">
      <stop stop-color="#f0b03a"/>
      <stop offset=".5" stop-color="#ffe7ad"/>
      <stop offset="1" stop-color="#e59f24"/>
    </linearGradient>
    <linearGradient id="m-apron" x1="0" y1="0" x2="0" y2="1">
      <stop stop-color="#ffffff"/>
      <stop offset="1" stop-color="#e1f2ff"/>
    </linearGradient>
    <clipPath id="m-clip">
      <path d="M310 46c-30 92-190 204-190 349a180 180 0 00360 0c0-145-140-257-170-349z"/>
    </clipPath>
  </defs>

  <!-- floor shadow -->
  <ellipse cx="290" cy="604" rx="200" ry="13" fill="#0b2b4a" opacity=".08"/>

  <!-- soap bubbles -->
  <g fill="#fff" fill-opacity=".75" stroke="#8fcdf5" stroke-width="3">
    <circle cx="474" cy="132" r="27"/>
    <circle cx="520" cy="200" r="12"/>
    <circle cx="430" cy="70" r="9"/>
    <circle cx="34" cy="250" r="11"/>
  </g>
  <path d="M460 122c3-9 10-15 18-17" stroke="#fff" stroke-width="5" stroke-linecap="round"/>

  <!-- feet -->
  <ellipse cx="248" cy="584" rx="48" ry="17" fill="#0f7fd1"/>
  <ellipse cx="352" cy="584" rx="48" ry="17" fill="#0f7fd1"/>

  <!-- waving arm -->
  <g class="m-arm2">
    <path d="M452 404c38-8 60-34 68-68" stroke="#2aa3ec" stroke-width="32" stroke-linecap="round"/>
    <circle cx="521" cy="328" r="24" fill="#7dcdf9"/>
  </g>

  <!-- body -->
  <path class="m-body" d="M310 46c-30 92-190 204-190 349a180 180 0 00360 0c0-145-140-257-170-349z" fill="url(#m-body)"/>
  <path d="M176 404c0-70 34-134 78-184" stroke="#fff" stroke-width="14" stroke-linecap="round" opacity=".5"/>
  <circle cx="170" cy="446" r="8" fill="#fff" opacity=".5"/>

  <!-- apron -->
  <g clip-path="url(#m-clip)">
    <path d="M222 446h156v64c0 38-28 66-64 66h-28c-36 0-64-28-64-66z" fill="url(#m-apron)"/>
    <path d="M222 446l-34-30M378 446l34-30" stroke="#fff" stroke-width="8" stroke-linecap="round"/>
    <rect x="266" y="504" width="68" height="40" rx="12" stroke="#8fcdf5" stroke-width="3"/>
    <!-- H monogram -->
    <path d="M284 460v30M316 460v30M284 475h32" stroke="#0877c8" stroke-width="7" stroke-linecap="round"/>
  </g>

  <!-- face -->
  <g class="m-head">
    <g class="m-eye">
      <ellipse cx="258" cy="330" rx="24" ry="28" fill="#fff"/>
      <ellipse cx="261" cy="334" rx="12" ry="15" fill="#0b2b4a"/>
      <circle cx="266" cy="326" r="4.500" fill="#fff"/>
    </g>
    <g class="m-eye">
      <ellipse cx="346" cy="330" rx="24" ry="28" fill="#fff"/>
      <ellipse cx="349" cy="334" rx="12" ry="15" fill="#0b2b4a"/>
      <circle cx="354" cy="326" r="4.500" fill="#fff"/>
    </g>
    <ellipse cx="218" cy="374" rx="16" ry="9" fill="#ff9d7a" opacity=".55"/>
    <ellipse cx="386" cy="374" rx="16" ry="9" fill="#ff9d7a" opacity=".55"/>
    <path d="M274 374q28 36 56 0z" fill="#0b2b4a"/>
    <path d="M290 392q12 8 24 0-12-8-24 0z" fill="#ff8f8f"/>
  </g>

  <!-- mop -->
  <g class="m-vac">
    <rect x="90" y="96" width="20" height="450" rx="10" fill="url(#m-pole)" transform="rotate(6 100 320)"/>
    <rect x="84" y="84" width="32" height="42" rx="14" fill="#0877c8" transform="rotate(6 100 320)"/>
    <g fill="#fff" stroke="#b7dcf7" stroke-width="2.500">
      <rect x="14" y="544" width="22" height="58" rx="11"/>
      <rect x="34" y="544" width="22" height="68" rx="11"/>
      <rect x="54" y="544" width="22" height="60" rx="11"/>
      <rect x="74" y="544" width="22" height="70" rx="11"/>
      <rect x="94" y="544" width="22" height="62" rx="11"/>
      <rect x="114" y="544" width="22" height="56" rx="11"/>
    </g>
    <rect x="10" y="530" width="130" height="28" rx="14" fill="#075a9c"/>
    <rect x="26" y="538" width="46" height="8" rx="4" fill="#8fcdf5" opacity=".8"/>
  </g>

  <!-- arm on the mop -->
  <g class="m-arm">
    <path d="M152 392c-30 2-48 18-60 40" stroke="#2aa3ec" stroke-width="32" stroke-linecap="round"/>
    <circle cx="90" cy="434" r="24" fill="#7dcdf9"/>
    <path d="M74 426c9-8 22-8 32 0" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".6"/>
  </g>

  <!-- sparkles -->
  <g class="m-spark" fill="#ffd36b">
    <path d="M500 462l6 16 16 6-16 6-6 16-6-16-16-6 16-6z"/>
    <path d="M196 96l5 13 13 5-13 5-5 13-5-13-13-5 13-5z"/>
    <path d="M40 330l4 11 11 4-11 4-4 11-4-11-11-4 11-4z"/>
  </g>
</svg>`;

/* ---------------------------------------------------------------- */
/* Photography                                                        */
/* ---------------------------------------------------------------- */
/* Every photograph on the site was art-directed for HOLYDJO-CLEAN:    */
/* no Oboosho picture, person, logo or text is reused. Each file is a  */
/* new scene built for the slot it fills. See public/photos/README.md. */

const photo = (src, alt) =>
  `<img class="photo-img" src="${src}" alt="${alt}" loading="lazy" decoding="async" />`;

/* Meet section: a living room after a visit. Landscape, 4:3. */
export const homePhoto = photo(
  'photos/meet-living-room.jpg',
  'A sunlit living room with a linen sofa and a plant, freshly cleaned by HOLYDJO-CLEAN',
);

/* Services: a gloved hand polishing a table. Portrait, 4:5. */
export const servicesPhoto = photo(
  'photos/services-detail.jpg',
  'A gloved hand polishing a wooden table with a blue microfibre cloth',
);

/* Cleaners: the team at work, seen from behind. Square. */
export const cleanersPhoto = photo(
  'photos/cleaners-team.jpg',
  'Two HOLYDJO-CLEAN cleaners walking through a bright apartment',
);

/* Inner page illustrations. */
export const aboutPhoto = photo(
  'photos/about-kitchen.jpg',
  'A spotless white kitchen in the morning sun',
);
export const suppliesPhoto = photo(
  'photos/services-supplies.jpg',
  'Spray bottles and folded cloths arranged on a white surface',
);
export const entrancePhoto = photo(
  'photos/entrance-hall.jpg',
  'A bright entryway with plants and sunlight',
);
export const teamPhoto = photo(
  'photos/team-hero.jpg',
  'A HOLYDJO-CLEAN team at work in a bright apartment',
);
export const roomPhoto = photo('photos/room-wide.jpg', 'A clean, sunlit living room');
/* Feature icons: two-tone, sky blue on a pale disc. */
const iconWrap = (inner) => `<svg viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="35" cy="35" r="35" fill="#eaf5fd"/>${inner}</svg>`;
export const icons = {
  /* phone with a confirmed booking */
  book: iconWrap(`<rect x="23" y="14" width="24" height="42" rx="6" fill="#bfe3fb" stroke="#0877c8" stroke-width="2.500"/><path d="M31 19h8" stroke="#0877c8" stroke-width="2.500" stroke-linecap="round"/><circle cx="35" cy="37" r="8" fill="#fff" stroke="#0877c8" stroke-width="2.500"/><path d="M31.500 37l2.500 2.500 4.500-5" stroke="#0877c8" stroke-width="2.500" stroke-linecap="round" stroke-linejoin="round"/>`),
  /* umbrella: covered and insured */
  shield: iconWrap(`<path d="M15 36a20 20 0 0140 0c-3-3-7-3-10 0-3-3-7-3-10 0-3-3-7-3-10 0-3-3-7-3-10 0z" fill="#bfe3fb" stroke="#0877c8" stroke-width="2.500" stroke-linejoin="round"/><path d="M35 16v-3M35 36v15a4 4 0 01-8 0" stroke="#0877c8" stroke-width="2.500" stroke-linecap="round"/>`),
  /* key: private and secure */
  lock: iconWrap(`<circle cx="27" cy="29" r="9" fill="#bfe3fb" stroke="#0877c8" stroke-width="2.500"/><circle cx="27" cy="29" r="2.500" fill="#0877c8"/><path d="M33.500 35.500L52 54M45 47l4-4M49.500 51.500l3-3" stroke="#0877c8" stroke-width="2.500" stroke-linecap="round"/>`),
  /* price tag with a percent sign */
  repeat: iconWrap(`<path d="M17 20a3 3 0 013-3h14l19 19a3 3 0 010 4L41 52a3 3 0 01-4 0L17 33z" fill="#bfe3fb" stroke="#0877c8" stroke-width="2.500" stroke-linejoin="round"/><circle cx="25" cy="25" r="2.500" fill="#0877c8"/><path d="M33 43l10-10" stroke="#0877c8" stroke-width="2.500" stroke-linecap="round"/><circle cx="34" cy="35" r="2" fill="#0877c8"/><circle cx="42" cy="41" r="2" fill="#0877c8"/>`),
};

/* Team portraits: flat avatars in the HOLYDJO-CLEAN uniform. */
export function portrait(seed, tone = '#0877c8') {
  const skins = ['#f1c7a5', '#d6a078', '#a56a48', '#f6d6c2', '#8a573a', '#deae8c'];
  const hairs = ['#2a2017', '#5a3b22', '#0b2b4a', '#c9813a', '#151515', '#8c4a2f'];
  const skin = skins[seed % skins.length];
  const hair = hairs[(seed * 3) % hairs.length];
  const bg = seed % 2 ? '#eaf5fd' : '#fdf3e3';
  const long = seed % 3 === 0;
  const cap = seed % 4 === 1;
  return `
<svg viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="400" fill="${bg}"/>
  <circle cx="${seed % 2 ? 250 : 70}" cy="90" r="78" fill="#fff" opacity=".7"/>
  <g fill="#fff" fill-opacity=".8" stroke="#8fcdf5" stroke-width="2.500">
    <circle cx="${seed % 2 ? 52 : 268}" cy="${120 + (seed % 3) * 22}" r="13"/>
    <circle cx="${seed % 2 ? 76 : 244}" cy="${84 + (seed % 3) * 22}" r="6"/>
  </g>
  ${long ? `<path d="M92 178c-10 40-6 88 8 112h120c14-24 18-72 8-112z" fill="${hair}"/>` : ''}
  <path d="M34 400c0-74 56-124 126-124s126 50 126 124z" fill="${tone}"/>
  <rect x="130" y="238" width="60" height="58" rx="22" fill="${skin}"/>
  <path d="M122 284l38 34 38-34 14 18-52 46-52-46z" fill="#fff"/>
  <path d="M116 344h88v56h-88z" fill="#fff"/>
  <path d="M148 360v22M172 360v22M148 371h24" stroke="${tone}" stroke-width="6" stroke-linecap="round"/>
  <ellipse cx="160" cy="176" rx="62" ry="72" fill="${skin}"/>
  <path d="M98 172c-4-54 24-92 62-92s66 38 62 92c-10-28-24-44-40-50-24 16-58 20-76 14-4 8-7 20-8 36z" fill="${hair}"/>
  ${cap ? `<path d="M98 146c4-42 30-68 62-68s58 26 62 68c-40-14-84-14-124 0z" fill="${tone}"/><path d="M92 150c44-16 92-16 136 0 5 2 4 9-2 9-44-9-88-9-132 0-6 0-7-7-2-9z" fill="#075a9c"/>` : ''}
  <ellipse cx="138" cy="182" rx="6" ry="7.500" fill="#0b2b4a"/>
  <ellipse cx="182" cy="182" rx="6" ry="7.500" fill="#0b2b4a"/>
  <ellipse cx="124" cy="204" rx="9" ry="5" fill="#ff9d7a" opacity=".5"/>
  <ellipse cx="196" cy="204" rx="9" ry="5" fill="#ff9d7a" opacity=".5"/>
  <path d="M144 208q16 16 32 0" stroke="#0b2b4a" stroke-width="4" stroke-linecap="round"/>
</svg>`;
}

export const social = {
  fb: `<svg viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M25 15h-1.5a2.5 2.5 0 00-2.5 2.5V29M18.5 21.5h6" /></svg>`,
  ig: `<svg viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2"><rect x="15" y="15" width="14" height="14" rx="4.5" /><circle cx="22" cy="22" r="3.2" /><circle cx="26.2" cy="17.8" r=".6" fill="currentColor" /></svg>`,
};

export const userIcon = `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="8" cy="5" r="3.2" /><path d="M2 14.5c1.2-2.6 3.4-4 6-4s4.800 1.400 6 4" /></svg>`;

export const menuIcon = `<svg viewBox="0 0 36 22" xmlns="http://www.w3.org/2000/svg">
  <circle cx="3" cy="11" r="2.6"/><circle cx="18" cy="11" r="2.6"/><circle cx="33" cy="11" r="2.6"/>
  <line class="line" x1="8" y1="1" x2="28" y2="21"/><line class="line" x1="28" y1="1" x2="8" y2="21"/>
</svg>`;

/* Loader mark: the mascot's face on a white drop, shown on the blue loading disc. */
export const loaderMark = `
<svg class="loader-mark" viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M104 14c-16 52-84 96-84 150a80 80 0 00160 0c0-54-60-98-76-150z" fill="#fff"/>
  <path d="M46 168c0-30 14-56 34-78" stroke="#bfe3fb" stroke-width="9" stroke-linecap="round"/>
  <ellipse cx="80" cy="150" rx="10" ry="13" fill="#0b2b4a"/>
  <ellipse cx="124" cy="150" rx="10" ry="13" fill="#0b2b4a"/>
  <circle cx="84" cy="145" r="3.500" fill="#fff"/>
  <circle cx="128" cy="145" r="3.500" fill="#fff"/>
  <ellipse cx="62" cy="174" rx="10" ry="6" fill="#ff9d7a" opacity=".6"/>
  <ellipse cx="142" cy="174" rx="10" ry="6" fill="#ff9d7a" opacity=".6"/>
  <path d="M88 176q14 18 28 0z" fill="#0b2b4a"/>
  <path d="M164 40l5 13 13 5-13 5-5 13-5-13-13-5 13-5z" fill="#ffd36b"/>
</svg>`;
