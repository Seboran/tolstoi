import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      // Entry is the package root index
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'Nirina',
      formats: ['es'],
      fileName: (format) => (format === 'es' ? 'index.js' : `index.${format}.js`),
    },
    rollupOptions: {
      // Preserve module structure so per-file exports (framework/*.js) stay accessible
      output: {
        dir: 'dist',
        entryFileNames: '[name].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name][extname]',
      },
    },
    sourcemap: true,
    target: 'es2020',
    emptyOutDir: false,
  },
})
