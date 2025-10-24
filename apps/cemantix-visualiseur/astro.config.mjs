// @ts-check

import node from '@astrojs/node'

import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  output: 'server',
  integrations: [vue()],

  adapter: node({
    mode: 'standalone',
  }),
})
