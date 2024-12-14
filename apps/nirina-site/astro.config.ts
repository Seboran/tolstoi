// @ts-check
import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'

import mdx from '@astrojs/mdx'

import netlify from '@astrojs/netlify'

import { shield } from '@kindspells/astro-shield'

import vue from '@astrojs/vue'
import { astroCSPHashGenerator } from './astroCSPHashgenerator'

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx(), shield({}), vue(), astroCSPHashGenerator],
  site: 'https://www.nirinarabeson.fr',
  output: 'static',
  adapter: netlify({}),
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
})
