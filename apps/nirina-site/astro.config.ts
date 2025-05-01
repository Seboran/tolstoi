// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'

import mdx from '@astrojs/mdx'

import node from '@astrojs/node'

import vue from '@astrojs/vue'
import { astroCSPHashGenerator } from './src/plugins/astroCSPHashgenerator'
import { targetBlank } from './src/plugins/targetBlank'

import react from '@astrojs/react'
import { MISTRAL_API_ENDPOINT_KEY, MISTRAL_API_KEY } from './utils/environment-variables'

// https://astro.build/config
export default defineConfig({
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: 'DM Serif Text',
        cssVariable: '--dm-serif-text-font',
      },
      {
        provider: fontProviders.google(),
        name: 'Sora',
        cssVariable: '--font-sans',
      },
    ],
  },
  integrations: [mdx(), vue(), astroCSPHashGenerator, react()],
  site: 'https://www.nirinarabeson.fr',
  output: 'static',
  server: {
    port: 3000,
  },
  adapter: node({
    mode: 'standalone',
  }),
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
  env: {
    schema: {
      [MISTRAL_API_KEY]: envField.string({
        context: 'server',
        access: 'public',
      }),
      [MISTRAL_API_ENDPOINT_KEY]: envField.string({
        context: 'server',
        access: 'public',
      }),
    },
  },
})
