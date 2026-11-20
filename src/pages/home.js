import { boot } from '../main.js';
import { t as tr } from '../i18n.js';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { bedrooms, bathrooms, cleaningTypes, features, reviews, quote, money } from '../data.js';
import { mascot, servicesPhoto, cleanersPhoto, homePhoto, icons } from '../illustrations.js';

/* ---------------------------------------------------------------- */
/* Render dynamic parts                                              */
/* ---------------------------------------------------------------- */

function renderHero() {
  document.querySelector('.hero-hello').innerHTML = mascot;
  document.querySelector('[data-illus="home"]').innerHTML = homePhoto;
  document.querySelector('[data-illus="services"]').innerHTML = servicesPhoto;
  document.querySelector('[data-illus="cleaners"]').innerHTML = cleanersPhoto;
  document.querySelector('.features').innerHTML = features
    .map(
      (f) => `
      <div class="feature anim-up">
        <div class="base">
          <div class="icon">${icons[f.icon]}</div>
          <h3>${f.title.replace('\n', ' <br>')}</h3>
        </div>
      </div>`,
    )
    .join('');
  document.querySelector('.slider-wrap').innerHTML = reviews
    .map(
      (r) => `
      <article class="review">
        <div class="stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div>
        <p>${r.text}</p>
        <div class="who">
          <span class="avatar">${r.name[0]}</span>
          <div><b>${r.name}</b><small>${r.where}</small></div>
        </div>
      </article>`,
    )
    .join('');
}

/* ---------------------------------------------------------------- */
/* Booking bar                                                       */
/* ---------------------------------------------------------------- */

function makeSelector(root, options, key, state, onChange, wide = false) {
  const el = document.createElement('div');
  el.className = `booking-selector${wide ? ' wide' : ''}`;
  const current = options.find((o) => o.id === state[key]) || options[0];
  el.innerHTML = `
    <button type="button" class="booking-current" aria-haspopup="listbox" aria-expanded="false">${current.label}</button>
    <div class="booking-selector-list" role="listbox">
      ${options
        .map(
          (o) => `
        <button type="button" role="option" class="selector-var ${o.id === current.id ? 'active' : ''}" data-id="${o.id}">
          ${o.label}
          ${o.hours ? `<small>${o.hours}</small>` : ''}
          ${o.desc ? `<span class="desc">${o.desc}</span>` : ''}
        </button>`,
        )
        .join('')}
    </div>`;
  const btn = el.querySelector('.booking-current');
  const close = () => {
    el.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  };
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const willOpen = !el.classList.contains('open');
    root.querySelectorAll('.booking-selector.open').forEach((s) => s !== el && s.classList.remove('open'));
    if (willOpen) {
      const list = el.querySelector('.booking-selector-list');
      const hero = el.closest('.section-hero').getBoundingClientRect();
      const r = el.getBoundingClientRect();
      const below = Math.min(hero.bottom, window.innerHeight) - r.bottom;
      el.classList.toggle('up', below < list.offsetHeight + 20 && r.top > list.offsetHeight + 20);
    }
    el.classList.toggle('open', willOpen);
    btn.setAttribute('aria-expanded', String(willOpen));
  });
  el.querySelectorAll('.selector-var').forEach((v) => {
    v.addEventListener('click', () => {
      state[key] = Number(v.dataset.id);
      el.querySelectorAll('.selector-var').forEach((x) => x.classList.toggle('active', x === v));
      btn.textContent = options.find((o) => o.id === state[key]).label;
      close();
      onChange();
    });
  });
  document.addEventListener('click', close);
  return el;
}

function initBookingBar(gsap) {
  const bar = document.querySelector('.booking-bar');
  const state = { bedroomId: 1, bathroomId: 7, typeId: 17 };
  const cta = bar.querySelector('.btn');
  const label = cta.querySelector('span:not(.circle)');

  const update = () => {
    const q = quote(state);
    const from = q.subtotal;
    const old = label.textContent;
    label.textContent = tr('Book from {price}', { price: money(from) });
    cta.href = `booking.html?bed=${state.bedroomId}&bath=${state.bathroomId}&type=${state.typeId}`;
    if (old !== label.textContent) gsap.fromTo(label, { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' });
  };

  const reveal = bar.querySelector('.reveal');
  bar.insertBefore(makeSelector(bar, bedrooms, 'bedroomId', state, update), cta);
  bar.insertBefore(makeSelector(bar, bathrooms, 'bathroomId', state, update), cta);
  bar.insertBefore(makeSelector(bar, cleaningTypes, 'typeId', state, update, true), cta);
  update();
  return reveal;
}

/* ---------------------------------------------------------------- */
/* Hero motion                                                       */
/* ---------------------------------------------------------------- */

function heroIntro(gsap, reduced) {
  const h1 = document.querySelector('#booking-engine h1 span');
  const p = document.querySelector('#booking-engine p');
  const bar = document.querySelector('.booking-bar');
  const reveal = bar.querySelector('.reveal');
  const mascotEl = document.querySelector('.hero-hello .mascot');
  const scrollmore = document.querySelector('.scrollmore');

  if (reduced) {
    gsap.set([h1, p, bar, mascotEl, scrollmore], { clearProps: 'all' });
    return;
  }

  gsap.set(h1, { yPercent: 110 });
  gsap.set(p, { y: 30, opacity: 0 });
  gsap.set(bar, { y: 30, opacity: 0 });
  gsap.set(mascotEl, { y: 80, opacity: 0, rotate: 4 });
  gsap.set(scrollmore, { opacity: 0 });

  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  tl.to(h1, { yPercent: 0, duration: 1.3 }, 0.1)
    .to(p, { y: 0, opacity: 1, duration: 1.1 }, 0.35)
    .to(bar, { y: 0, opacity: 1, duration: 1.1 }, 0.5)
    .fromTo(reveal, { scaleX: 0, transformOrigin: 'left' }, { scaleX: 1, duration: 0.7, ease: 'expo.inOut' }, 0.55)
    .to(reveal, { scaleX: 0, transformOrigin: 'right', duration: 0.7, ease: 'expo.inOut' }, 1.2)
    .to(mascotEl, { y: 0, opacity: 1, rotate: 0, duration: 1.6, ease: 'expo.out' }, 0.3)
    .to(scrollmore, { opacity: 1, duration: 0.8 }, 1.2);

  /* idle float + blink */
  gsap.to(mascotEl, { y: -14, duration: 2.6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 });
  gsap.to(mascotEl.querySelector('.m-vac'), { rotate: -3, transformOrigin: '50% 90%', duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 });
  const eyes = mascotEl.querySelectorAll('.m-eye');
  const blink = () => {
    gsap.to(eyes, { scaleY: 0.1, transformOrigin: '50% 50%', duration: 0.08, yoyo: true, repeat: 1, onComplete: () => gsap.delayedCall(2 + Math.random() * 4, blink) });
  };
  gsap.delayedCall(3, blink);

  /* pointer parallax */
  const hero = document.querySelector('.section-hero');
  const blobs = hero.querySelectorAll('.circles .circle');
  const qx = gsap.quickTo(mascotEl, 'x', { duration: 0.8, ease: 'power3' });
  const qr = gsap.quickTo(mascotEl, 'rotate', { duration: 0.8, ease: 'power3' });
  hero.addEventListener('pointermove', (e) => {
    const dx = (e.clientX / window.innerWidth - 0.5) * 2;
    const dy = (e.clientY / window.innerHeight - 0.5) * 2;
    qx(dx * 16);
    qr(dx * 2);
    blobs.forEach((b, i) => gsap.to(b, { x: dx * (10 + i * 8), y: dy * (10 + i * 6), duration: 1.2, ease: 'power3', overwrite: 'auto' }));
  });

  /* scroll: hero bottom curve + mascot drift */
  gsap.to('#back path', {
    attr: { d: 'M0,0V9s0,1,8,1,8-1,8-1V0H0Z' },
    ease: 'none',
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
  });
  gsap.to(mascotEl, {
    yPercent: 25,
    ease: 'none',
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
  });
}

/* ---------------------------------------------------------------- */
/* Reviews slider                                                    */
/* ---------------------------------------------------------------- */

function initSlider(gsap) {
  gsap.registerPlugin(Draggable, InertiaPlugin);
  const slider = document.querySelector('.slider');
  const wrap = slider.querySelector('.slider-wrap');
  const cards = wrap.querySelectorAll('.review');
  const gap = 20;

  const bounds = () => ({ minX: Math.min(0, slider.clientWidth - wrap.scrollWidth), maxX: 0 });
  const drag = Draggable.create(wrap, {
    type: 'x',
    bounds: bounds(),
    inertia: true,
    edgeResistance: 0.85,
    dragResistance: 0.05,
    cursor: 'grab',
    activeCursor: 'grabbing',
    snap: (v) => {
      const step = cards[0].offsetWidth + gap;
      const b = bounds();
      return gsap.utils.clamp(b.minX, b.maxX, Math.round(v / step) * step);
    },
  })[0];
  window.addEventListener('resize', () => drag.applyBounds(bounds()));

  const step = () => cards[0].offsetWidth + gap;
  const go = (dir) => {
    const b = bounds();
    const target = gsap.utils.clamp(b.minX, b.maxX, drag.x + dir * -step() * 2);
    gsap.to(wrap, { x: target, duration: 0.9, ease: 'expo.out', onUpdate: () => drag.update() });
  };
  document.querySelector('.slider-nav .prev').addEventListener('click', () => go(-1));
  document.querySelector('.slider-nav .next').addEventListener('click', () => go(1));

  /* rating bars */
  document.querySelectorAll('.some_rating .front').forEach((f) => {
    gsap.to(f, { width: `${(Number(f.dataset.rate) / 5) * 100}%`, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: f, start: 'top 90%', once: true } });
  });
}

/* ---------------------------------------------------------------- */

renderHero();

boot(({ gsap, ScrollTrigger, reduced, lenis }) => {
  initBookingBar(gsap);
  heroIntro(gsap, reduced);
  initSlider(gsap);

  document.querySelector('.scrollmore_trigger').addEventListener('click', () => {
    const target = document.querySelector('#meet');
    if (lenis) lenis.scrollTo(target);
    else target.scrollIntoView({ behavior: 'smooth' });
  });

  /* header turns white on the blue band */
  const header = document.getElementById('header');
  ScrollTrigger.create({
    trigger: '.section-booking',
    start: 'top 40px',
    end: 'bottom 40px',
    onToggle: (self) => header.classList.toggle('white', self.isActive),
  });
});
