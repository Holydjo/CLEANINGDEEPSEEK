import { brand, nav, region } from './data.js';
import { t, otherLanguage } from './i18n.js';
import { social, userIcon, menuIcon, logoMark, loaderMark } from './illustrations.js';

const page = document.body.dataset.page || '';

/* The label is written in the language it switches to. */
const switchLabel = otherLanguage.id === 'fr' ? 'Passer au français' : 'Switch to English';
const langAttrs = `type="button" data-lang="${otherLanguage.id}" lang="${otherLanguage.id}" aria-label="${switchLabel}" data-no-i18n`;

function isCurrent(href) {
  return href.replace('.html', '') === page;
}

export function renderPreloader() {
  const el = document.createElement('div');
  el.className = 'preload';
  el.innerHTML = `
    <div class="load">
      <div class="anim-hand">
        <div class="circle">
          <span class="bubble" style="width:18px;height:18px;left:22%;top:70%"></span>
          <span class="bubble" style="width:10px;height:10px;left:68%;top:62%"></span>
          <span class="bubble" style="width:26px;height:26px;left:72%;top:22%"></span>
          ${loaderMark}
        </div>
      </div>
      <div class="perc">0%</div>
      <small>${t('Tidying up, one moment')}</small>
    </div>`;
  document.body.prepend(el);
  return el;
}

export function renderHeader() {
  const header = document.createElement('header');
  header.id = 'header';
  header.innerHTML = `
    <div class="flex flex-just-b flex-center-v">
      <a href="index.html" class="logo" aria-label="${brand.name} home">
        ${logoMark}<span class="main">${brand.wordmark}</span>
        <span class="desc">${brand.tagline}</span>
      </a>
      <div class="controls">
        <button class="lang-switch controls-lang" ${langAttrs}>${otherLanguage.label}</button>
        <a href="signin.html" class="controls-login">${userIcon}<span>Login</span></a>
        <button class="controls-menu" aria-label="Open menu" aria-expanded="false" aria-controls="main-menu">${menuIcon}</button>
      </div>
    </div>`;

  const menu = document.createElement('nav');
  menu.id = 'main-menu';
  menu.setAttribute('aria-label', 'Main');
  menu.innerHTML = `
    <div class="menu-back">
      <span class="menu-blob b1"></span>
      <span class="menu-blob b2"></span>
    </div>
    <div class="wrap" data-lenis-prevent>
      <div class="menu-side">
        <div>
          <div class="ttl">Contacts</div>
          <div class="values">
            <div class="value"><div class="name">E-Mail</div><a class="val" href="mailto:${brand.email}">${brand.email}</a></div>
            <div class="value"><div class="name">Phone</div><a class="val" href="${brand.phoneHref}">${brand.phone}</a></div>
          </div>
          <div class="social">
            <a href="#" aria-label="Facebook">${social.fb}</a>
            <a href="#" aria-label="Instagram">${social.ig}</a>
          </div>
        </div>
        <div>
          <div class="ttl">${t('Business hours ({tz})', { tz: region.timezone })}</div>
          <div class="values">
            ${brand.hours.map((h) => `<div class="value"><div class="name">${h.days}</div><div class="val">${h.time}</div></div>`).join('')}
          </div>
        </div>
      </div>
      <div class="menu-nav">
        <ul>
          ${nav.map((n) => `<li><a href="${n.href}" class="${isCurrent(n.href) ? 'is-current' : ''}">${n.label}</a></li>`).join('')}
          <li><a href="booking.html">Book a visit</a></li>
        </ul>
      </div>
      <div class="menu-foot">
        <span>${region.hq} · ${region.country}</span>
        <button class="lang-switch" ${langAttrs}>${otherLanguage.name}</button>
        <span>Come home to clean.</span>
      </div>
    </div>`;

  document.body.prepend(menu);
  document.body.prepend(header);
  return { header, menu };
}

export function renderFooter() {
  const footer = document.createElement('footer');
  footer.id = 'footer';
  footer.innerHTML = `
    <div class="wrap">
      <div class="top">
        <div>
          <a href="index.html" class="logo" aria-label="${brand.name} home">${logoMark}<span class="main">${brand.wordmark}</span></a>
          <p class="copy">${t('Copyright © {year} {brand}.', { year: new Date().getFullYear(), brand: brand.name })}<br>${t('All rights reserved.')}</p>
        </div>
        <div class="footer-menu">
          <div class="menu"><ul>
            <li><a href="about.html">About us</a></li>
            <li><a href="team.html">Team</a></li>
            <li><a href="contacts.html">Talk to us</a></li>
          </ul></div>
          <div class="menu"><ul>
            <li><a href="services.html">What we clean</a></li>
            <li><a href="faq.html">Questions, answered.</a></li>
            <li><a href="careers.html">Work with us</a></li>
          </ul></div>
          <div class="menu"><ul>
            <li><a href="booking.html">Book a visit</a></li>
            <li><a href="signin.html">Sign in</a></li>
          </ul></div>
        </div>
        <div class="subinfo">
          <b>Come home to clean.</b>
          <div class="social">
            <a href="#" aria-label="Facebook">${social.fb}</a>
            <a href="#" aria-label="Instagram">${social.ig}</a>
          </div>
        </div>
      </div>
      <div class="btm">
        <div class="legal"><a href="#">Terms and Conditions</a><a href="#">Privacy Policy</a><button class="lang-switch" ${langAttrs}>${otherLanguage.name}</button></div>
        <div class="creator"><b>${brand.name}</b> · Home cleaning in ${region.country}</div>
      </div>
    </div>`;
  document.body.append(footer);
  return footer;
}
