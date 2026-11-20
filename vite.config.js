import { defineConfig } from 'vite';
import { resolve } from 'node:path';

const pages = ['index', 'services', 'about', 'team', 'faq', 'contacts', 'careers', 'booking', 'signin'];

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: Object.fromEntries(pages.map((p) => [p, resolve(import.meta.dirname, `${p}.html`)])),
    },
  },
});
