// This script prevents flash of wrong theme
;(function () {
  // Check localStorage first (for user preference)
  const darkModeEnabled =
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)

  // Apply dark class immediately, before the page renders
  if (darkModeEnabled) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})()
