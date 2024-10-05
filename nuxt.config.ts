import { fileURLToPath, URL } from 'node:url'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  alias: {
    '@': fileURLToPath(new URL('.', import.meta.url))
  },
  devtools: { enabled: true },
  modules: ['@nuxt/test-utils/module', '@nuxt/ui']
})
