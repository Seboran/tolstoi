import OpenAI from 'openai'
import { MISTRAL_API_ENDPOINT_KEY, MISTRAL_API_KEY } from '../../utils/environment-variables.ts'
import type { ListeMessagesMistral } from '../../utils/types.ts'
import { callWithRetry } from '../utils/retryUtils.ts'
import { PEPPERS_SYSTEM_PROMPT } from './system_prompt.ts'

const MODEL = 'mistral-large-2411'

export function useChatPeppersFunction(
  variables: Partial<{
    apiKey: string
    MISTRAL_API_ENDPOINT: string
  }>,
) {
  const client = new OpenAI({
    baseURL: variables.MISTRAL_API_ENDPOINT,
    apiKey: variables.apiKey,
  })

  async function post(request: Request): Promise<Response> {
    /**
     * Gestion des erreurs de configuration
     */
    if (!variables.apiKey) throw new Error(`${MISTRAL_API_KEY} is not set on netlify or is empty`)
    if (!variables.MISTRAL_API_ENDPOINT)
      throw new Error(`${MISTRAL_API_ENDPOINT_KEY} is not set on netlify or is empty`)

    const requestBody = await request.json()

    if (!requestBody) {
      return new Response(
        JSON.stringify({
          error: 'Request body is missing',
        }),
        { status: 400 },
      )
    }

    /**
     * Début concret de la fonction
     */
    const { messages } = requestBody

    // Handle regular streaming request
    return await fetchMistralApi(messages)
  }

  /**
   * Méthode qui transforme les événements SSE de mistral en une réponse avec un ReadableStream
   *
   * @param messages Liste des messages à envoyer à l'API Mistral
   * @returns une réponse contenant un ReadableStream
   */
  async function fetchMistralApi(messages: ListeMessagesMistral): Promise<Response> {
    const completionStream = await callWithRetry(() =>
      client.chat.completions.create({
        model: MODEL,
        messages: [{ role: 'system', content: PEPPERS_SYSTEM_PROMPT }, ...messages],
        stream: true,
      }),
    )

    const streamBody = new ReadableStream<Uint8Array>({
      async start(controller) {
        const encoder = new TextEncoder()
        for await (const chunk of completionStream as any) {
          // Extract text content from each chunk.
          const content = chunk.choices?.[0]?.delta?.content
          if (content) {
            controller.enqueue(encoder.encode(content))
          }
        }
        controller.close()
      },
    })
    return new Response(streamBody, {
      headers: {
        'Content-Type': 'text/event-stream',
      },
    })
  }

  return { post }
}
