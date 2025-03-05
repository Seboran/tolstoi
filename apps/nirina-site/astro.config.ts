// @ts-check
import { defineConfig } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'

import mdx from '@astrojs/mdx'

import netlify from '@astrojs/netlify'

import { shield } from '@kindspells/astro-shield'

import vue from '@astrojs/vue'
import { astroCSPHashGenerator } from './src/plugins/astroCSPHashgenerator'
import { targetBlank } from './src/plugins/targetBlank'

import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), shield({}), vue(), astroCSPHashGenerator, react()],
  site: 'https://www.nirinarabeson.fr',
  output: 'static',
  adapter: netlify({}),
  prefetch: true,
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
    plugins: [tailwindcss()],
  },
  devToolbar: {
    enabled: !process.env.DISABLE_TOOLBAR && true,
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
