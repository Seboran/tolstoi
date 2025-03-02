// @ts-check
import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'

import mdx from '@astrojs/mdx'

import netlify from '@astrojs/netlify'

import { shield } from '@kindspells/astro-shield'

import vue from '@astrojs/vue'
import { astroCSPHashGenerator } from './src/plugins/astroCSPHashgenerator'
import { targetBlank } from './src/plugins/targetBlank'

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx(), shield({}), vue(), astroCSPHashGenerator, react()],
  site: 'https://www.nirinarabeson.fr',
  output: 'static',
  adapter: netlify({}),
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
  markdown: {
    rehypePlugins: [
      [
        targetBlank,
        {
          domain: 'nirinarabeson.fr',
        },
      ],
    ],
  },
})