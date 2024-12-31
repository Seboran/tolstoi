import useClipboard from 'vue-clipboard3'
const { toClipboard } = useClipboard()

export async function useCopy(value) {
  try {
    await toClipboard(value)
    console.log('Copied to clipboard')
  } catch (e) {
    console.error('Failed to copy, see error:', e)
  }
}
