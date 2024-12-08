import type { Config, Context } from '@netlify/edge-functions'
import { ENABLE_CHAT as ENABLE_CHAT_ENV } from '../../utils/environment-variables.ts'
const ENABLE_CHAT = Netlify.env.get(ENABLE_CHAT_ENV)

export default async (_request: Request, _context: Context) => {
  const body = {
    ENABLE_CHAT,
  }
  return new Response(JSON.stringify(body))
}

export const config: Config = {
  path: '/api/toggles',
}
