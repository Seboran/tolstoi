import tailwindTypography from '@tailwindcss/typography'
import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class', // Keep this as 'class' if you want toggle functionality
  theme: {
    extend: {
      colors: {
        ghost: {
          border: 'var(--color-ghost-border)',
          light: 'var(--color-ghost-light)',
          dark: 'var(--color-ghost-dark)',
        },
        chat: {
          bg: {
            light: 'var(--color-chat-bg-light)',
            dark: 'var(--color-chat-bg-dark)',
          },
          text: {
            light: 'var(--color-chat-text-light)',
            dark: 'var(--color-chat-text-dark)',
          },
          border: {
            light: 'var(--color-chat-border-light)',
            dark: 'var(--color-chat-border-dark)',
          },
        },
        button: {
          bg: 'var(--color-button-bg)',
          'bg-hover': 'var(--color-button-bg-hover)',
          text: 'var(--color-button-text)',
        },
        placeholder: {
          light: 'var(--color-placeholder-light)',
          dark: 'var(--color-placeholder-dark)',
        },
        gradient: {
          light: 'var(--color-border-gradient-light)',
          dark: 'var(--color-border-gradient-dark)',
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
        '.bg-chat': {
          backgroundColor: 'var(--color-chat-bg-light)', // light mode
          color: 'var(--color-chat-text-light)',
          '.dark &': {
            backgroundColor: 'var(--color-chat-bg-dark)', // dark mode
            color: 'var(--color-chat-text-dark)',
          },
        },
        '.bg-chat-button': {
          backgroundColor: 'var(--color-button-bg)',
          color: 'var(--color-button-text)',
          '.dark &': {
            backgroundColor: 'var(--color-button-bg)', // Keep same color in dark mode
          },
          '&:hover': {
            backgroundColor: 'var(--color-button-bg-hover)',
          },
        },
        '.placeholder-chat': {
          '&::placeholder': {
            color: 'var(--color-placeholder-light)',
            opacity: '0.75',
          },
          '&:focus::placeholder': {
            opacity: '0.5',
          },
          '.dark &::placeholder': {
            color: 'var(--color-placeholder-dark)',
            opacity: '0.75',
          },
          '.dark &:focus::placeholder': {
            opacity: '0.5',
          },
        },
      })
    }),
  ],
}
