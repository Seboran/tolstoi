import tailwindTypography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  plugins: [tailwindTypography],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-headings': 'var(--color-title)',
          },
        },
      },
    },
  },
}
