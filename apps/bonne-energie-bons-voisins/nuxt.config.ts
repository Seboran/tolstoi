import { vueCoverageOverlay } from '@seboran/vue-coverage-overlay'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  extends: ['layer-bons-comptes'],

  modules: ['@nuxt/ui', '@pinia/nuxt'],

  vite: {
    plugins: [
      vueCoverageOverlay({
        coveragePath: '../coverage/coverage-final.json',
      }),
    ],
  },

  devServer: {
    port: 3001,
  },
})
