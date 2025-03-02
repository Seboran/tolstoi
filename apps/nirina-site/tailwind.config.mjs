import tailwindTypography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
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
  plugins: [tailwindTypography],
}
