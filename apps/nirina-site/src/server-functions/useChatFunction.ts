import OpenAI from 'openai'
import { MISTRAL_API_ENDPOINT_KEY, MISTRAL_API_KEY } from '../../utils/environment-variables.ts'
import type { ListeMessagesMistral } from '../../utils/types.ts'
import { systemPrompt } from './system_prompt.ts'

export function useChatFunction(
  variables: Partial<{
    apiKey: string
    ENABLE_CHAT: string
    MISTRAL_API_ENDPOINT: string
    MISTRAL_AGENT_ID: string
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

    /**
     * Désactivation du service si non configuré
     */
    if (!variables.ENABLE_CHAT)
      return new Response(
        JSON.stringify({
          error: 'There is no chat ATM',
        }),
        {
          status: 405,
        },
      )
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
    return await fetchMistralApi(requestBody.messages)
  }

  /**
   * Méthode qui transforme les événements SSE de mistral en une réponse avec un ReadableStream
   *
   * @param messages Liste des messages à envoyer à l'API Mistral
   * @returns une réponse contenant un ReadableStream
   */
  async function fetchMistralApi(messages: ListeMessagesMistral): Promise<Response> {
    const completionStream = await client.chat.completions.create({
      model: 'mistral-small-latest', // adjust model if needed
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
      stream: true,
    })

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
