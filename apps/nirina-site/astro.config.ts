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

const headers = {
  'Content-Security-Policy':
    "frame-ancestors 'none'; default-src https: *.apple.com; object-src 'none'; script-src 'self' 'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=' 'sha256-WN0hqek1jEauhlhWVVXeQPa5BD3f0rsMdmwSZtw1Cys='; style-src 'self' 'sha256-vv9IoKo7BSLbWcUHr3tNmfNVmm5L/9Cfn2H6LMk7/ow=' fonts.googleapis.com; img-src https: * data:; connect-src 'self'; font-src fonts.gstatic.com",
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
}
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
    headers: import.meta.env.DEV ? {} : headers,
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
