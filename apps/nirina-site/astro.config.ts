// @ts-check
import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'

import vercel from '@astrojs/vercel/serverless'

import starlight from '@astrojs/starlight'

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    starlight({
      title: 'Site de Nirina Rabeson',
    }),
  ],
  site: 'https://www.nirinarabeson.fr',
  output: 'server',
  adapter: vercel({
    isr: true,
  }),
})
