import { getSecret } from 'astro:env/server'
import type { APIRoute } from 'astro'
import {
  ENABLE_CHAT as ENABLE_CHAT_KEY,
  MISTRAL_AGENT_ID_KEY,
  MISTRAL_API_ENDPOINT_KEY,
  MISTRAL_API_KEY,
} from '../../../utils/environment-variables'
import { useChatFunction } from '../../server-functions/useChatFunctionV3'
const { post } = useChatFunction({
  apiKey: getSecret(MISTRAL_API_KEY),
  MISTRAL_AGENT_ID: getSecret(MISTRAL_AGENT_ID_KEY),
  ENABLE_CHAT: getSecret(ENABLE_CHAT_KEY),
  MISTRAL_API_ENDPOINT: getSecret(MISTRAL_API_ENDPOINT_KEY),
})
export const POST: APIRoute = async ({ request }) => {
  return await post(request)
}

export const prerender = false
