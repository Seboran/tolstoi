// @ts-check
import { defineConfig, envField } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'

import mdx from '@astrojs/mdx'

import netlify from '@astrojs/netlify'
import node from '@astrojs/node'
import { shield } from '@kindspells/astro-shield'

import vue from '@astrojs/vue'
import { astroCSPHashGenerator } from './src/plugins/astroCSPHashgenerator'
import { targetBlank } from './src/plugins/targetBlank'

import react from '@astrojs/react'
import {
  ENABLE_CHAT as ENABLE_CHAT_KEY,
  MISTRAL_AGENT_ID_KEY,
  MISTRAL_API_ENDPOINT_KEY,
  MISTRAL_API_KEY,
  RUN_NODE_ADAPTER_KEY,
} from './utils/environment-variables'

const enableNodeJs = !!process.env[RUN_NODE_ADAPTER_KEY]

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), shield({}), vue(), astroCSPHashGenerator, react()],
  site: 'https://www.nirinarabeson.fr',
  output: 'static',
  adapter: enableNodeJs
    ? node({
        mode: 'standalone',
      })
    : netlify({}),
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
        access: 'secret',
        optional: true,
      }),
      [ENABLE_CHAT_KEY]: envField.boolean({
        context: 'server',
        access: 'public',
        optional: true,
      }),
      [MISTRAL_API_ENDPOINT_KEY]: envField.string({
        context: 'server',
        access: 'public',
        optional: true,
      }),
      [MISTRAL_AGENT_ID_KEY]: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
    },
  },
})
