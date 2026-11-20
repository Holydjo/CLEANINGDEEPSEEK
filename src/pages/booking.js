import { boot } from '../main.js';
import { t as tr, lang } from '../i18n.js';
import { region, provinces, bedrooms, bathrooms, cleaningTypes, addons, frequencies, quote, money, money0, pct, isPostalCode, formatPostalCode, provinceFromPostalCode } from '../data.js';

const params = new URLSearchParams(location.search);

const state = {
  step: 0,
  bedroomId: Number(params.get('bed')) || 1,
  bathroomId: Number(params.get('bath')) || 7,
  typeId: Number(params.get('type')) || 17,
  addonIds: [],
  frequencyId: 'once',
  date: null,
  time: null,
  access: 'concierge',
  pets: 'none',
  promo: '',
  provinceId: region.defaultProvince,
};

const accessOptions = [
  { id: 'home', label: tr('I’ll be home') },
  { id: 'concierge', label: tr('Concierge') },
  { id: 'key', label: tr('Hidden key') },
  { id: 'code', label: tr('Entry code') },
];
const petOptions = [
  { id: 'none', label: tr('No pets') },
  { id: 'dog', label: tr('Dog') },
  { id: 'cat', label: tr('Cat') },
  { id: 'other', label: tr('Other') },
];
/* Start times from 8 am to 7 pm: "8:00 am" in English, "8 h" in French. */
const fmtHour = (h) => (lang === 'fr' ? `${h} h` : `${h % 12 || 12}:00 ${h < 12 ? 'am' : 'pm'}`);
const times = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map(fmtHour);

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

function nextDays(n) {
  const out = [];
  const d = new Date();
  for (let i = 1; i <= n; i += 1) {
    const x = new Date(d.getFullYear(), d.getMonth(), d.getDate() + i);
    out.push(x);
  }
  return out;
}

const fmtDay = new Intl.DateTimeFormat(region.locale, { weekday: 'short' });
const fmtMonth = new Intl.DateTimeFormat(region.locale, { month: 'short' });
const fmtFull = new Intl.DateTimeFormat(region.locale, { weekday: 'long', month: 'long', day: 'numeric' });

function chips(el, options, key) {
  el.innerHTML = options.map((o) => `<button type="button" class="chip ${String(state[key]) === String(o.id) ? 'active' : ''}" data-id="${o.id}">${o.label}${o.discount ? ` · −${pct(o.discount)}` : ''}</button>`).join('');
  el.addEventListener('click', (e) => {
    const b = e.target.closest('.chip');
    if (!b) return;
    const raw = b.dataset.id;
    state[key] = Number.isNaN(Number(raw)) ? raw : Number(raw);
    $$('.chip', el).forEach((c) => c.classList.toggle('active', c === b));
    render();
  });
}

function renderControls() {
  chips($('[data-chips="bedroomId"]'), bedrooms, 'bedroomId');
  chips($('[data-chips="bathroomId"]'), bathrooms, 'bathroomId');
  chips($('[data-chips="frequencyId"]'), frequencies, 'frequencyId');
  chips($('[data-chips="access"]'), accessOptions, 'access');
  chips($('[data-chips="pets"]'), petOptions, 'pets');

  const choices = $('[data-choices="typeId"]');
  choices.innerHTML = cleaningTypes
    .map((t) => `<button type="button" class="choice ${state.typeId === t.id ? 'active' : ''}" data-id="${t.id}"><b>${t.label}</b><small>${t.hours}</small><span class="p">${tr('from {price}', { price: money(t.base) })}</span></button>`)
    .join('');
  choices.addEventListener('click', (e) => {
    const b = e.target.closest('.choice');
    if (!b) return;
    state.typeId = Number(b.dataset.id);
    $$('.choice', choices).forEach((c) => c.classList.toggle('active', c === b));
    render();
  });

  const ad = $('[data-addons]');
  ad.innerHTML = addons.map((a) => `<button type="button" class="chip" data-id="${a.id}">${a.label} · +${money0(a.price)}</button>`).join('');
  ad.addEventListener('click', (e) => {
    const b = e.target.closest('.chip');
    if (!b) return;
    const id = b.dataset.id;
    state.addonIds = state.addonIds.includes(id) ? state.addonIds.filter((x) => x !== id) : [...state.addonIds, id];
    b.classList.toggle('active');
    render();
  });

  const prov = $('#b-province');
  prov.innerHTML = provinces.map((p) => `<option value="${p.id}" ${p.id === state.provinceId ? 'selected' : ''}>${p.name}</option>`).join('');

  const postal = $('#b-postal');
  postal.addEventListener('input', () => {
    postal.value = formatPostalCode(postal.value);
    const guess = provinceFromPostalCode(postal.value);
    /* "X" is shared by the Northwest Territories and Nunavut, so keep Nunavut if it is already chosen. */
    if (guess && !(guess === 'NT' && prov.value === 'NU')) prov.value = guess;
    postal.setCustomValidity(!postal.value || isPostalCode(postal.value) ? '' : tr('Enter a Canadian postal code, for example M5V 2T6.'));
  });

  const days = nextDays(14);
  state.date = days[0];
  const dates = $('[data-dates]');
  dates.innerHTML = days.map((d, i) => `<button type="button" class="date ${i === 0 ? 'active' : ''}" data-i="${i}"><small>${fmtDay.format(d)}</small><b>${d.getDate()}</b><small>${fmtMonth.format(d)}</small></button>`).join('');
  dates.addEventListener('click', (e) => {
    const b = e.target.closest('.date');
    if (!b) return;
    state.date = days[Number(b.dataset.i)];
    $$('.date', dates).forEach((c) => c.classList.toggle('active', c === b));
    render();
  });

  state.time = times[2];
  const t = $('[data-times]');
  t.innerHTML = times.map((x) => `<button type="button" class="chip ${x === state.time ? 'active' : ''}" data-id="${x}">${x}</button>`).join('');
  t.addEventListener('click', (e) => {
    const b = e.target.closest('.chip');
    if (!b) return;
    state.time = b.dataset.id;
    $$('.chip', t).forEach((c) => c.classList.toggle('active', c === b));
    render();
  });
}

function render() {
  state.provinceId = $('#b-province').value || state.provinceId;
  const q = quote(state);
  const included = q.type.id >= 19;
  $('.addons-note').hidden = !included;
  $('[data-addons]').style.opacity = included ? 0.4 : 1;
  $('[data-addons]').style.pointerEvents = included ? 'none' : '';

  const rows = [
    [tr('Type of cleaning'), q.type.label],
    [tr('Home'), `${q.bed.label}, ${q.bath.label}`],
    [tr('Date'), state.date ? fmtFull.format(state.date) : '—'],
    [tr('Time'), state.time || '—'],
    [tr('Frequency'), q.freq.label],
  ];
  if (!included && q.chosen.length) rows.push([tr('Add-ons'), q.chosen.map((a) => a.label).join(', ')]);

  $('[data-summary]').innerHTML = `
    ${rows.map(([k, v]) => `<div class="row"><span>${k}</span><span>${v}</span></div>`).join('')}
    <div class="row"><span>${tr('Subtotal')}</span><span>${money(q.subtotal)}</span></div>
    ${q.discount ? `<div class="row discount"><span>${tr('Discount ({rate})', { rate: pct(q.discountRate) })}</span><span>−${money(q.discount)}</span></div>` : ''}
    ${q.taxes.map((t) => `<div class="row"><span>${t.label} (${pct(t.rate)}) · ${q.province.id}</span><span>${money(t.amount)}</span></div>`).join('')}
    <div class="row total"><span>${tr('Total ({currency})', { currency: region.currency })}</span><span>${money(q.total)}</span></div>`;

  const data = Object.fromEntries(new FormData($('#details')));
  $('[data-review]').innerHTML = `
    <div class="ttl">${tr('Total information on order')}</div>
    ${rows.map(([k, v]) => `<div class="row"><span>${k}</span><b>${v}</b></div>`).join('')}
    <div class="row"><span>${tr('Name')}</span><b>${escapeHtml(`${data.first || ''} ${data.last || ''}`.trim() || '—')}</b></div>
    <div class="row"><span>${tr('Address')}</span><b>${escapeHtml([data.apt && tr('Unit {unit}', { unit: data.apt }), data.address, data.city, data.address && q.province.id, data.postal].filter(Boolean).join(', ') || '—')}</b></div>
    <div class="row"><span>${tr('How will we get in?')}</span><b>${accessOptions.find((a) => a.id === state.access).label}</b></div>
    <div class="row"><span>${tr('Tax')}</span><b>${q.taxes.map((t) => `${t.label} ${money(t.amount)}`).join(' + ')}</b></div>
    <div class="row"><span>${tr('Total ({currency})', { currency: region.currency })}</span><b>${money(q.total)}</b></div>`;

  $$('.steps-nav span').forEach((s, i) => {
    s.classList.toggle('done', i < state.step);
    s.classList.toggle('current', i === state.step);
  });
  $$('.step').forEach((s) => s.classList.toggle('active', Number(s.dataset.step) === state.step));
  const back = $('[data-back]');
  const next = $('[data-next]');
  back.style.visibility = state.step === 0 ? 'hidden' : 'visible';
  $('.step-actions').style.display = state.step === 4 ? 'none' : '';
  next.querySelector('span:not(.circle)').textContent = state.step === 3 ? tr('Submit') : tr('Next');
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

renderControls();

boot(({ gsap, lenis }) => {
  const go = (dir) => {
    if (dir > 0 && state.step === 2 && !$('#details').reportValidity()) return;
    state.step = Math.max(0, Math.min(4, state.step + dir));
    if (state.step === 4) {
      const first = new FormData($('#details')).get('first');
      $('[data-done-text]').textContent = tr('Thanks{name}. Your {type} clean is set for {date} at {time}. This is a demo booking, so no cleaner was dispatched and nothing was charged.', { name: first ? `, ${first}` : '', type: quote(state).type.label, date: fmtFull.format(state.date), time: state.time });
    }
    render();
    const active = $('.step.active');
    gsap.fromTo(active.children, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.04, ease: 'expo.out' });
    const top = $('.booking-steps').getBoundingClientRect().top + window.scrollY - 100;
    if (lenis) lenis.scrollTo(top);
    else window.scrollTo({ top });
  };
  $('[data-next]').addEventListener('click', () => go(1));
  $('[data-back]').addEventListener('click', () => go(-1));
  $('#details').addEventListener('input', render);
  $('#details').addEventListener('change', render);
  $('[data-promo-apply]').addEventListener('click', () => {
    state.promo = $('[data-promo]').value;
    render();
    const ok = state.promo.trim().toUpperCase() === 'CLEAN10';
    gsap.fromTo('[data-promo]', { x: ok ? 0 : -6 }, { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
    $('[data-promo]').style.borderColor = ok ? 'var(--green)' : state.promo ? 'var(--red)' : '';
  });
  render();
});
