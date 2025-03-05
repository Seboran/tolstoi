// Theme management utility

export function getThemePreference() {
  if (typeof window === 'undefined') return 'light'

  // Check localStorage first
  if (localStorage.theme === 'dark') return 'dark'
  if (localStorage.theme === 'light') return 'light'

  // Fall back to system preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function setTheme(theme) {
  if (typeof window === 'undefined') return

  // Save to localStorage
  localStorage.theme = theme

  // Apply theme to document
  applyTheme()
}

export function toggleTheme() {
  const currentTheme = getThemePreference()
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
  setTheme(newTheme)
}

export function applyTheme() {
  if (typeof window === 'undefined') return

  const isDark = getThemePreference() === 'dark'
  document.documentElement.classList.toggle('dark', isDark)
}
