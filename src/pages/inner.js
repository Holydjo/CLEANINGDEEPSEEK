/* Shared behaviours for the inner pages: services, about, team, faq, contacts, careers. */
import { boot } from '../main.js';
import { t as tr } from '../i18n.js';
import { cleaningTypes, addons, checklist, notes, team, faq, perks, requirements, serviceAreas, money, money0, num1 } from '../data.js';
import { portrait, mascot, suppliesPhoto, aboutPhoto, teamPhoto, entrancePhoto, roomPhoto } from '../illustrations.js';

const page = document.body.dataset.page;

function illus() {
  const map = { services: suppliesPhoto, about: aboutPhoto, team: teamPhoto, faq: mascot, contacts: entrancePhoto, careers: mascot };
  const el = document.querySelector('.page-illus');
  if (el && map[page]) el.innerHTML = map[page];
  /* The about page also has a colour block in the mission section. */
  if (page === 'about') {
    const slot = document.querySelector('[data-illus="home"]');
    if (slot) slot.innerHTML = roomPhoto;
  }
}

function renderServices() {
  const cards = document.querySelector('[data-render="types"]');
  if (!cards) return;
  cards.innerHTML = cleaningTypes
    .map(
      (t) => `
      <article class="card anim-up ${t.featured ? 'featured' : ''}">
        ${t.featured ? '<span class="tag">Most popular</span>' : ''}
        <h3>${t.label}</h3>
        <p>${t.desc}</p>
        <div class="price">${money(t.base)}<small>from</small></div>
        <div class="dur">${tr('{hours} · studio, 1 bathroom', { hours: t.hours })}</div>
        <ul class="check" style="margin-bottom: 24px">${t.includes.map((i) => `<li>${i}</li>`).join('')}</ul>
        <a href="booking.html?type=${t.id}" class="btn ${t.featured ? '' : 'ghost'} small"><span>${tr('Book {type}', { type: t.label })}</span></a>
      </article>`,
    )
    .join('');

  document.querySelector('[data-render="checklist"]').innerHTML = Object.entries(checklist)
    .map(([ttl, items]) => `<div class="anim-up"><h3>${ttl}</h3><ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul></div>`)
    .join('');

  document.querySelector('[data-render="addons"]').innerHTML = addons
    .map((a) => `<div class="addon anim-up"><span>${a.label}</span><span class="p">+${money0(a.price)}</span></div>`)
    .join('');

  document.querySelector('[data-render="notes"]').innerHTML = `<b>* Please Note</b><ul>${notes.map((n) => `<li>${n}</li>`).join('')}</ul>`;
}

function renderTeam() {
  const el = document.querySelector('[data-render="team"]');
  if (!el) return;
  el.innerHTML = team
    .map(
      (m) => `
      <div class="member anim-up">
        <div class="photo">${portrait(m.seed, m.seed % 2 ? '#0877c8' : '#2aa3ec')}</div>
        <b>${m.name}</b>
        <small>${m.role}</small>
        <div class="rating">${'★'.repeat(Math.round(m.rating))}<span>${tr('{rating} · {jobs} cleanings', { rating: num1(m.rating), jobs: m.jobs })}</span></div>
      </div>`,
    )
    .join('');
}

function renderFaq() {
  const el = document.querySelector('[data-render="faq"]');
  if (!el) return;
  el.innerHTML = faq
    .map(
      (f, i) => `
      <div class="faq-item anim-up">
        <button type="button" aria-expanded="false" aria-controls="faq-${i}"><span>${f.q}</span><span class="plus"></span></button>
        <div class="answer" id="faq-${i}"><p>${f.a}</p></div>
      </div>`,
    )
    .join('');
}

function initFaq(gsap, ScrollTrigger) {
  document.querySelectorAll('.faq-item').forEach((item) => {
    const btn = item.querySelector('button');
    const ans = item.querySelector('.answer');
    btn.addEventListener('click', () => {
      const open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
      gsap.to(ans, { height: open ? 'auto' : 0, duration: 0.6, ease: 'expo.out', onComplete: () => ScrollTrigger.refresh() });
    });
  });
}

function renderCareers() {
  const p = document.querySelector('[data-render="perks"]');
  if (!p) return;
  p.innerHTML = perks.map((x) => `<li class="anim-up">${x}</li>`).join('');
  document.querySelector('[data-render="requirements"]').innerHTML = requirements.map((x) => `<li class="anim-up">${x}</li>`).join('');
}

function renderAreas() {
  const el = document.querySelector('[data-render="areas"]');
  if (!el) return;
  el.innerHTML = serviceAreas.map((a) => `<div class="row"><span>${a.city}, ${a.province}</span><b>${a.note}</b></div>`).join('');
}

function initForms(gsap) {
  document.querySelectorAll('form[data-demo]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const ok = form.parentElement.querySelector('.form-success');
      gsap.to(form, {
        opacity: 0,
        y: -10,
        duration: 0.4,
        onComplete: () => {
          form.style.display = 'none';
          ok.classList.add('show');
          gsap.from(ok, { opacity: 0, y: 20, duration: 0.8, ease: 'expo.out' });
        },
      });
    });
  });
}

illus();
renderServices();
renderTeam();
renderCareers();
renderFaq();
renderAreas();

boot(({ gsap, ScrollTrigger }) => {
  initFaq(gsap, ScrollTrigger);
  initForms(gsap);
  /* page hero intro */
  const hero = document.querySelector('.page-hero');
  if (hero) {
    gsap.from(hero.querySelectorAll('h1, .lead, .subttl'), { y: 40, opacity: 0, duration: 1.2, stagger: 0.1, ease: 'expo.out' });
    const il = hero.querySelector('.page-illus svg, .page-illus img');
    if (il) {
      gsap.from(il, { y: 50, opacity: 0, duration: 1.4, ease: 'expo.out', delay: 0.2 });
      if (il.tagName === 'svg') gsap.to(il, { y: -12, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.6 });
    }
  }
});
