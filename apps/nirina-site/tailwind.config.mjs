import tailwindTypography from '@tailwindcss/typography'
import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        ghost: {
          border: 'var(--color-ghost-border)',
          light: 'var(--color-ghost-light)',
          dark: 'var(--color-ghost-dark)',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            h2: {
              fontWeight: '400',
            },
            h3: {
              fontWeight: '400',
            },
          },
        },
      },
    },
  },
  plugins: [
    tailwindTypography,
    plugin(function ({ addComponents }) {
      addComponents({
        '.bg-ghost': {
          backgroundColor: 'var(--color-ghost-light)', // light mode
          color: 'var(--color-text-light)',
          borderColor: 'var(--color-ghost-border)',
          '.dark &': {
            backgroundColor: 'var(--color-ghost-dark)', // dark mode
            color: 'var(--color-text-dark)',
          },
        },
      })
    }),
  ],
}
