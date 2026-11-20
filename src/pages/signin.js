import { boot } from '../main.js';
import { t as tr } from '../i18n.js';
import { mascot } from '../illustrations.js';

document.querySelector('.mascot-slot').innerHTML = mascot;

boot(({ gsap }) => {
  const tabs = document.querySelectorAll('.tabs button');
  const form = document.getElementById('auth');
  const title = document.querySelector('[data-title]');
  const sub = document.querySelector('[data-sub]');
  const submit = document.querySelector('[data-submit]');

  const setMode = (mode) => {
    tabs.forEach((t) => t.classList.toggle('active', t.dataset.tab === mode));
    document.querySelectorAll('[data-only]').forEach((el) => {
      el.hidden = el.dataset.only !== mode;
    });
    title.textContent = mode === 'in' ? tr('Sign In') : tr('Sign Up');
    sub.textContent = mode === 'in' ? tr('Welcome back, please login to your account.') : tr('Create an account and discover more opportunities.');
    submit.textContent = mode === 'in' ? tr('Sign In') : tr('Sign Up');
    form.querySelector('#a-pass').autocomplete = mode === 'in' ? 'current-password' : 'new-password';
    gsap.fromTo(form.children, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.04, ease: 'power3.out' });
  };

  tabs.forEach((t) => t.addEventListener('click', () => setMode(t.dataset.tab)));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    /* Demo only: credentials are never read, stored or sent. */
    form.reset();
    form.style.display = 'none';
    document.querySelector('.tabs').style.display = 'none';
    const ok = document.querySelector('.form-success');
    ok.classList.add('show');
    gsap.from(ok, { y: 20, opacity: 0, duration: 0.8, ease: 'expo.out' });
  });

  const m = document.querySelector('.auth .side .mascot');
  if (m) {
    gsap.from(m, { y: 80, opacity: 0, duration: 1.6, ease: 'expo.out' });
    gsap.to(m, { y: -14, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.6 });
  }
  gsap.from('.auth .panel .inner > *', { y: 30, opacity: 0, duration: 1, stagger: 0.08, ease: 'expo.out' });
});
