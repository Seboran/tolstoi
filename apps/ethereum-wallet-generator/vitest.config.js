/// <reference types="vitest" />
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  test: {
    exclude: ['tests'],
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['json', 'text', 'html'],
      reportsDirectory: './coverage',
      include: ['src/**/*.{ts,vue,js}'],
    },
  },
})
