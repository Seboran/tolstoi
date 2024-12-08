import { ENABLE_CHAT } from '../../../utils/environment-variables'

export async function useToggles(togglesEndpoint: URL) {
  let body: Record<string, unknown> = {}
  try {
    const request = await fetch(togglesEndpoint)
    body = await request.json()
  } catch (e) {
    console.error(e)
  }

  return {
    enableChatWithMistral: !!body[ENABLE_CHAT],
  }
}
