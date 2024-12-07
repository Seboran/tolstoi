import { ENABLE_CHAT } from '../../../utils/environment-variables'

export function useToggles() {
  return {
    enableChatWithMistral: !!process.env[ENABLE_CHAT],
  }
}
