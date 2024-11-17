// @ts-check
import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'

import mdx from '@astrojs/mdx'

import netlify from '@astrojs/netlify'

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx()],
  site: 'https://www.nirinarabeson.fr',
  output: 'hybrid',
  adapter: netlify({
    edgeMiddleware: true,
  }),
})
