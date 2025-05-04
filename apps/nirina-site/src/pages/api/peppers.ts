import { MISTRAL_API_ENDPOINT, MISTRAL_API_KEY } from 'astro:env/server'
import type { APIRoute } from 'astro'
import { useChatPeppersFunction } from '../../server-functions/useChatFunctionPeppers'

const { post } = useChatPeppersFunction({
  apiKey: MISTRAL_API_KEY,
  MISTRAL_API_ENDPOINT: MISTRAL_API_ENDPOINT,
})
export const POST: APIRoute = async ({ request }) => {
  return await post(request)
}

export const prerender = false
