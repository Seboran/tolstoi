import { fileURLToPath } from 'node:url'
import { configDefaults, defineProject } from 'vitest/config'

import vue from '@vitejs/plugin-vue'

export default defineProject({
  plugins: [vue()],
  test: {
    environment: 'happy-dom',
  },
})
