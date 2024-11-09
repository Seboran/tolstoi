export function useCanUserInteract() {
  const allowUserInput = ref(false)
  onNuxtReady(() => {
    allowUserInput.value = true
  })

  return { allowUserInput }
}
