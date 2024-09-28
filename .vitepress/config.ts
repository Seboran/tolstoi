import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Nirina Rabeson',
  cleanUrls: true,
  head: [
    ['meta', { name: 'twitter:site', content: '@nirinarabeson.fr' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['description', { content: 'Le site de Nirina Rabeson' }],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✨</text></svg>`
      }
    ]
  ]
})
