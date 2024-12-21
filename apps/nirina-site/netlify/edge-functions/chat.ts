import type { Config } from '@netlify/edge-functions'
import { useChatFunction } from '../../src/server-functions/useChatFunction.ts'
import {
  ENABLE_CHAT as ENABLE_CHAT_ENV,
  MISTRAL_AGENT_ID_KEY,
  MISTRAL_API_ENDPOINT_KEY,
  MISTRAL_API_KEY,
} from '../../utils/environment-variables.ts'

export const config: Config = {
  path: '/api/chat',
}

const apiKey = Netlify.env.get(MISTRAL_API_KEY)
const ENABLE_CHAT = Netlify.env.get(ENABLE_CHAT_ENV)
const MISTRAL_API_ENDPOINT = Netlify.env.get(MISTRAL_API_ENDPOINT_KEY)
const MISTRAL_AGENT_ID = Netlify.env.get(MISTRAL_AGENT_ID_KEY)

const { post } = useChatFunction({
  apiKey,
  MISTRAL_AGENT_ID,
  ENABLE_CHAT,
  MISTRAL_API_ENDPOINT,
})

export default async (request: Request) => {
  return await post(request)
}
