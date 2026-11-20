/*
  Languages: English (default) and Canadian French.

  English text in the HTML and scripts is the source. In French mode every
  string is looked up in src/locales/fr.js, keyed by its English text.
  - t('English text') translates a string used in a script.
  - translateDocument() translates the text and labels already on the page.
  The choice is remembered on the device. "?lang=fr" or "?lang=en" in the
  address forces a language, which is handy for sharing a link.
*/
import fr from './locales/fr.js';

const STORE = 'holydjo-lang';
export const languages = [
  { id: 'en', label: 'EN', name: 'English', locale: 'en-CA' },
  { id: 'fr', label: 'FR', name: 'Français', locale: 'fr-CA' },
];
const ids = languages.map((l) => l.id);

function detect() {
  const forced = new URLSearchParams(window.location.search).get('lang');
  if (ids.includes(forced)) {
    try {
      localStorage.setItem(STORE, forced);
    } catch {
      /* storage can be blocked; the choice then lasts for this page only */
    }
    return forced;
  }
  try {
    const saved = localStorage.getItem(STORE);
    if (ids.includes(saved)) return saved;
  } catch {
    /* ignore */
  }
  return (navigator.language || 'en').toLowerCase().startsWith('fr') ? 'fr' : 'en';
}

export const lang = detect();
export const locale = languages.find((l) => l.id === lang).locale;
/* The language the switch offers: the one not in use. */
export const otherLanguage = languages.find((l) => l.id !== lang);

const dict = lang === 'fr' ? fr : null;
const known = dict ? new Set(Object.values(dict).map((v) => norm(v))) : null;
/* English strings met in French mode with no translation. Read it in the console as __i18nMissing. */
export const missing = new Set();
if (dict) window.__i18nMissing = missing;

function norm(s) {
  return String(s).replace(/\s+/g, ' ').trim();
}

/* Translate one string. Placeholders such as {price} are filled from vars. */
export function t(text, vars) {
  let out = text;
  if (dict) {
    const key = norm(text);
    if (Object.hasOwn(dict, key)) out = dict[key];
    else if (/[A-Za-z]/.test(key)) missing.add(key);
  }
  if (vars) out = out.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
  return out;
}

const ATTRS = ['placeholder', 'aria-label', 'title', 'alt'];

/* Translate the text nodes and labels inside root. Safe to call more than once. */
export function translateDocument(root = document.body) {
  document.documentElement.lang = locale;
  if (dict) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || parent.closest('script, style, svg, [data-no-i18n]')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const raw = node.nodeValue;
      const key = norm(raw);
      if (!key) return;
      if (Object.hasOwn(dict, key)) {
        const lead = raw.match(/^\s*/)[0] ? ' ' : '';
        const tail = raw.match(/\s*$/)[0] ? ' ' : '';
        node.nodeValue = lead + dict[key] + tail;
      } else if (/[A-Za-z]{2}/.test(key) && !known.has(key)) {
        missing.add(key);
      }
    });

    root.querySelectorAll(ATTRS.map((a) => `[${a}]`).join(',')).forEach((el) => {
      if (el.closest('[data-no-i18n]')) return;
      ATTRS.forEach((a) => {
        const v = el.getAttribute(a);
        if (v && Object.hasOwn(dict, norm(v))) el.setAttribute(a, dict[norm(v)]);
      });
    });

    if (root === document.body) {
      if (Object.hasOwn(dict, norm(document.title))) document.title = dict[norm(document.title)];
      const meta = document.querySelector('meta[name="description"]');
      if (meta && Object.hasOwn(dict, norm(meta.content))) meta.content = dict[norm(meta.content)];
    }
  }
  document.documentElement.classList.remove('i18n-pending');
}

/* Switch language: remember the choice and reload the page in it. */
export function setLanguage(id) {
  if (!ids.includes(id) || id === lang) return;
  try {
    localStorage.setItem(STORE, id);
  } catch {
    /* ignore */
  }
  const url = new URL(window.location.href);
  url.searchParams.delete('lang');
  /* Without storage the address carries the choice instead. */
  let stored = null;
  try {
    stored = localStorage.getItem(STORE);
  } catch {
    /* ignore */
  }
  if (stored !== id) url.searchParams.set('lang', id);
  window.location.assign(url.toString());
}
