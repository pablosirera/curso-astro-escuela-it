import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import vue from '@astrojs/vue';

import sitemap from '@astrojs/sitemap';

import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), vue(), sitemap()],
  site: 'https://techbazar.vercel.app',
  output: 'hybrid',
  image: {
    domains: ['astro.build']
  },
  adapter: vercel()
});