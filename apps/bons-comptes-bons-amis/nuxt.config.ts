import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'

const rootDir = fileURLToPath(new URL('../..', import.meta.url))
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  future: {
    compatibilityVersion: 4
  },
  alias: {
    '@': fileURLToPath(new URL('./app', import.meta.url)),
    pinia: path.resolve(rootDir, 'node_modules/pinia/dist/pinia.mjs')
  },
  devtools: { enabled: true },
  modules: [
    '@nuxt/test-utils/module',
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    'nuxt-typed-router',
    '@pinia/nuxt',
    'nuxt-security'
  ],
  security: {
    headers: {
      contentSecurityPolicy: {
        'script-src': [
          "'self'", // Fallback value, will be ignored by most modern browsers (level 3)
          'https:', // Fallback value, will be ignored by most modern browsers (level 3)
          "'unsafe-inline'", // Fallback value, will be ignored by almost any browser (level 2)
          "'strict-dynamic'", // Strict CSP via 'strict-dynamic', supported by most modern browsers (level 3)
          "'nonce-{{nonce}}'" // Enables CSP nonce support for scripts in SSR mode, supported by almost any browser (level 2)
        ],
        'style-src': [
          "'self'", // Enables loading of stylesheets hosted on same origin
          'https:', // For increased security, replace by the specific hosting domain or file name of your external stylesheets
          "'unsafe-inline'" // Recommended default for most Nuxt apps
        ],
        'base-uri': ["'none'"],
        'img-src': ["'self'", 'data:'], // Add relevant https://... sources if you load images from external sources
        'font-src': ["'self'", 'https:', 'data:'], //  For increased security, replace by the specific sources for fonts
        'object-src': ["'none'"],
        'script-src-attr': ["'none'"],
        'upgrade-insecure-requests': true,
        'frame-ancestors': ["'self'", 'https://nirinarabeson.fr', 'https://www.nirinarabeson.fr']
      }
    }
  }
})
