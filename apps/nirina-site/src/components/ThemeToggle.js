export function toggleTheme() {
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.remove('dark')
    localStorage.theme = 'light'
  } else {
    document.documentElement.classList.add('dark')
    localStorage.theme = 'dark'
  }
}

// To reset to system preference
export function useSystemTheme() {
  localStorage.removeItem('theme')
  document.documentElement.classList.toggle(
    'dark',
    window.matchMedia('(prefers-color-scheme: dark)').matches,
  )
}
