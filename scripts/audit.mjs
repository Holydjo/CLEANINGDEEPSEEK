/*
  Repository audit for the HOLYDJO-CLEAN remake.

  Run after `npm run build` with `npm run audit`. It checks the files that are
  easy to break while editing: the report status, local links, the picture
  files named in the manifest, and any accidental hotlink to the reference.
*/
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';

const root = process.cwd();
const pages = readdirSync(root).filter((f) => extname(f) === '.html').sort();
const htmlFiles = [...pages, ...readdirSync('src/pages').filter((f) => f.endsWith('.js')).map((f) => join('src/pages', f))];
const sourceFiles = [
  ...pages,
  ...readdirSync('src').filter((f) => f.endsWith('.js')).map((f) => join('src', f)),
  ...readdirSync('src/pages').filter((f) => f.endsWith('.js')).map((f) => join('src/pages', f)),
  ...readdirSync('src/locales').filter((f) => f.endsWith('.js')).map((f) => join('src/locales', f)),
];

let failed = 0;
const pass = (ok, message) => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${message}`);
  if (!ok) failed += 1;
};

/* 1. The report is the completion gate. */
pass(/Status:\s*REMAKE COMPLETE/.test(readFileSync('REMAKE_REPORT.md', 'utf8')), 'REMAKE_REPORT.md says REMAKE COMPLETE');
pass(/REMAKE COMPLETE\s*\**\s*$/.test(readFileSync('REMAKE_REPORT.md', 'utf8').trim()), 'report ends with the completion line');

/* 2. Every local page link resolves to a file. */
const localLinks = (href) => {
  if (!href || href.startsWith('#') || /^(mailto:|tel:|https?:|data:)/.test(href)) return [];
  if (href.includes('${') || href.includes('{')) return [];
  const clean = href.split('#')[0].split('?')[0];
  if (!clean) return [];
  const bare = clean.replace(/^\//, '');
  return [resolve(root, bare), resolve(root, 'public', bare)];
};
for (const file of htmlFiles) {
  const text = readFileSync(file, 'utf8');
  const refs = [...text.matchAll(/\b(?:href|src)="([^"]+)"/g)].map((m) => m[1]);
  for (const href of refs) {
    const targets = localLinks(href);
    if (targets.length) pass(targets.some(existsSync), `${file}: ${href}`);
  }
}

/* 3. Every picture named in the code or the manifest exists. */
const pictureRefs = new Set();
for (const file of sourceFiles) {
  for (const m of readFileSync(file, 'utf8').matchAll(/(photos\/[A-Za-z0-9_.-]+\.(?:jpg|png|webp))/g)) pictureRefs.add(m[1]);
}
for (const line of readFileSync('docs/PICTURES.md', 'utf8').split('\n')) {
  for (const m of line.matchAll(/`([^`]+\.jpg)`/g)) pictureRefs.add(`photos/${m[1]}`);
}
for (const ref of [...pictureRefs].sort()) pass(existsSync(join(root, 'public', ref)), `picture ${ref}`);

/* 4. No reference asset is hotlinked. */
const forbidden = /(oboosho\.com|assets\.awwwards\.com)/i;
const offenders = sourceFiles.filter((file) => forbidden.test(readFileSync(file, 'utf8')));
pass(offenders.length === 0, `no Oboosho or Awwwards asset host in site files${offenders.length ? `: ${offenders.join(', ')}` : ''}`);

/* 5. The report, readme and pictures note exist. */
for (const file of ['README.md', 'REMAKE_REPORT.md', 'docs/PICTURES.md']) pass(existsSync(file), `document ${file}`);
pass(existsSync('docs/screens/desktop-index.png'), 'desktop screenshot set');
pass(existsSync('docs/screens/mobile-index.png'), 'mobile screenshot set');

console.log(`\n${failed === 0 ? 'AUDIT PASSED' : `AUDIT FAILED: ${failed} check(s)`}`);
process.exit(failed === 0 ? 0 : 1);
