import { MISTRAL_API_ENDPOINT, MISTRAL_API_KEY } from 'astro:env/server'
import type { APIRoute } from 'astro'
import { useChatFunction } from '../../server-functions/useChatFunctionV3'

const { post } = useChatFunction({
  apiKey: MISTRAL_API_KEY,
  MISTRAL_API_ENDPOINT: MISTRAL_API_ENDPOINT,
})
export const POST: APIRoute = async ({ request }) => {
  return await post(request)
}

export const prerender = false
