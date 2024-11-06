import path from 'path'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // resolve: {
  //   alias: {
  //     '@': './',
  //   },
  // },
  test: {
    globals: true,
    browser: {
      enabled: true,
      name: 'firefox',
      provider: 'playwright',
      // https://playwright.dev
      providerOptions: {},
      headless: false,
    },
    include: ['tests-components/**/*.{spec,test}.{jsx,tsx}'],
  },
})
