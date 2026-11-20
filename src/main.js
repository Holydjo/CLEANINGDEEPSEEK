import './styles/main.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { renderPreloader, renderHeader, renderFooter } from './layout.js';
import { t as tr, translateDocument, setLanguage } from './i18n.js';

gsap.registerPlugin(ScrollTrigger);

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.documentElement.classList.add('js');
if (reduced) document.documentElement.classList.add('reduced-motion');

export const app = { gsap, ScrollTrigger, lenis: null, reduced };

/* ---------------------------------------------------------------- */
/* Smooth scroll                                                     */
/* ---------------------------------------------------------------- */

function initLenis() {
  if (reduced) return null;
  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  app.lenis = lenis;
  return lenis;
}

/* ---------------------------------------------------------------- */
/* Preloader                                                         */
/* ---------------------------------------------------------------- */

function runPreloader(onDone) {
  const shown = sessionStorage.getItem('holydjo-loaded');
  if (shown || reduced) {
    onDone();
    return;
  }
  document.body.classList.add('is-loading');
  const el = renderPreloader();
  const perc = el.querySelector('.perc');
  const gloveEl = el.querySelector('.loader-mark');
  const bubbles = el.querySelectorAll('.bubble');
  const state = { n: 0 };

  gsap.fromTo(gloveEl, { rotate: -8 }, { rotate: 8, duration: 0.6, yoyo: true, repeat: -1, ease: 'sine.inOut', transformOrigin: '50% 100%' });
  gsap.to(bubbles, { y: -30, opacity: 0, duration: 1.4, stagger: 0.3, repeat: -1, ease: 'power1.out' });

  const tl = gsap.timeline({
    onComplete() {
      sessionStorage.setItem('holydjo-loaded', '1');
      document.body.classList.remove('is-loading');
      gsap.to(el.querySelector('.load'), { y: -40, opacity: 0, duration: 0.5, ease: 'power2.in' });
      gsap.to(el, {
        yPercent: -100,
        duration: 0.9,
        delay: 0.3,
        ease: 'expo.inOut',
        onComplete: () => el.remove(),
      });
      gsap.delayedCall(0.45, onDone);
    },
  });
  tl.to(state, {
    n: 100,
    duration: 1.6,
    ease: 'power2.inOut',
    onUpdate: () => {
      perc.textContent = `${Math.round(state.n)}%`;
    },
  });
}

/* ---------------------------------------------------------------- */
/* Header + menu                                                     */
/* ---------------------------------------------------------------- */

function initHeader() {
  const { header, menu } = renderHeader();
  const btn = header.querySelector('.controls-menu');
  const items = menu.querySelectorAll('.menu-nav li a');
  const sides = menu.querySelectorAll('.menu-side .ttl, .menu-side .value, .menu-side .social');
  let open = false;

  gsap.set(items, { yPercent: 110 });
  gsap.set(sides, { y: 20, opacity: 0 });

  const tl = gsap.timeline({ paused: true });
  tl.to(menu.querySelector('.menu-back'), { y: 0, duration: 0.9, ease: 'expo.inOut' }, 0)
    .to(items, { yPercent: 0, duration: 0.9, stagger: 0.06, ease: 'expo.out' }, 0.35)
    .to(sides, { y: 0, opacity: 1, duration: 0.7, stagger: 0.05, ease: 'power3.out' }, 0.5);

  const toggle = (force) => {
    open = typeof force === 'boolean' ? force : !open;
    header.classList.toggle('menu-open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? tr('Close menu') : tr('Open menu'));
    if (open) {
      menu.classList.add('open');
      app.lenis?.stop();
      tl.timeScale(1).play();
    } else {
      app.lenis?.start();
      tl.timeScale(1.6).reverse();
      tl.eventCallback('onReverseComplete', () => menu.classList.remove('open'));
    }
  };

  btn.addEventListener('click', () => toggle());
  document.addEventListener('keydown', (e) => e.key === 'Escape' && open && toggle(false));

  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  return header;
}

/* ---------------------------------------------------------------- */
/* Shared micro-interactions                                         */
/* ---------------------------------------------------------------- */

function initButtons() {
  document.querySelectorAll('.btn').forEach((btn) => {
    if (!btn.querySelector('.circle')) {
      const c = document.createElement('span');
      c.className = 'circle';
      btn.prepend(c);
    }
    const circle = btn.querySelector('.circle');
    btn.addEventListener('pointerenter', (e) => {
      if (reduced) return;
      const r = btn.getBoundingClientRect();
      gsap.set(circle, { left: e.clientX - r.left, top: e.clientY - r.top, scale: 0 });
      gsap.to(circle, { scale: 4, duration: 0.8, ease: 'power3.out' });
    });
    btn.addEventListener('pointerleave', (e) => {
      if (reduced) return;
      const r = btn.getBoundingClientRect();
      gsap.to(circle, { left: e.clientX - r.left, top: e.clientY - r.top, scale: 0, duration: 0.5, ease: 'power3.out' });
    });
  });
}

function initReveals() {
  if (reduced) {
    gsap.set('.anim-block > *, .anim-up', { clearProps: 'all' });
    return;
  }
  document.querySelectorAll('.anim-block').forEach((block) => {
    const kids = [...block.children].filter((k) => !k.classList.contains('no-anim'));
    gsap.to(kids, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.1,
      ease: 'expo.out',
      scrollTrigger: { trigger: block, start: 'top 82%', once: true },
    });
  });
  document.querySelectorAll('.anim-up').forEach((el, i) => {
    gsap.to(el, {
      y: 0,
      opacity: 1,
      duration: 1.1,
      ease: 'expo.out',
      delay: (i % 4) * 0.08,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });
  document.querySelectorAll('.showright, .showleft').forEach((el) => {
    gsap.to(el, {
      clipPath: 'inset(0 0% 0 0%)',
      duration: 1.4,
      ease: 'expo.inOut',
      scrollTrigger: { trigger: el, start: 'top 78%', once: true },
    });
  });
}

function initBlobs() {
  if (reduced) return;
  document.querySelectorAll('.circles').forEach((group) => {
    const section = group.closest('.section, .page-hero') || group.parentElement;
    group.querySelectorAll('.circle').forEach((c, i) => {
      gsap.to(c, {
        y: (i % 2 ? -1 : 1) * (80 + i * 30),
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
      gsap.to(c, {
        rotate: i % 2 ? -12 : 12,
        duration: 8 + i * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
  });
}

function initAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) {
        e.preventDefault();
        return;
      }
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      if (app.lenis) app.lenis.scrollTo(target, { offset: -20 });
      else target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

/* ---------------------------------------------------------------- */
/* Boot                                                              */
/* ---------------------------------------------------------------- */

export function boot(pageInit) {
  initHeader();
  renderFooter();
  /* Header, footer and the page's own text are on the page now: put them in the chosen language. */
  translateDocument();
  document.querySelectorAll('[data-lang]').forEach((b) => b.addEventListener('click', () => setLanguage(b.dataset.lang)));
  initLenis();
  initButtons();
  initBlobs();
  initAnchors();

  const start = () => {
    initReveals();
    pageInit?.(app);
    ScrollTrigger.refresh();
  };

  runPreloader(start);
}
