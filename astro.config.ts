import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://dave.coffee',
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
