import OpenAI from 'openai'
import { MISTRAL_API_ENDPOINT_KEY, MISTRAL_API_KEY } from '../../utils/environment-variables.ts'
import type { ListeMessagesMistral } from '../../utils/types.ts'
import { systemPrompt } from './system_prompt.ts'

const MODEL = 'mistral-small-latest'

// Add helper functions for retry logic
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function callWithRetry<T>(fn: () => Promise<T>, retries = 3, delayMs = 500): Promise<T> {
  let attempt = 0
  while (attempt < retries) {
    try {
      return await fn()
    } catch (error: any) {
      if (
        error.response?.status === 429 ||
        (typeof error.status === 'number' && error.status === 429)
      ) {
        attempt++
        if (attempt < retries) {
          await sleep(delayMs * attempt)
          continue
        }
      }
      throw error
    }
  }
  return await fn() // fallback
}

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
    const { messages, tools, stream = true } = requestBody

    if (tools) {
      // Handle function calling request
      return await fetchMistralApiWithFunctions(messages, tools, stream)
    } else {
      // Handle regular streaming request
      return await fetchMistralApi(messages)
    }
  }

  /**
   * Méthode qui permet d'utiliser les function calling de l'API
   *
   * @param messages Liste des messages à envoyer à l'API Mistral
   * @param tools Liste des outils/fonctions à utiliser
   * @param stream Indique si la réponse doit être streamée
   * @returns une réponse contenant soit un ReadableStream, soit un JSON
   */
  async function fetchMistralApiWithFunctions(
    messages: ListeMessagesMistral,
    tools: any[],
    stream: boolean,
  ): Promise<Response> {
    try {
      const response = await callWithRetry(() =>
        client.chat.completions.create({
          model: MODEL,
          messages: [{ role: 'system', content: systemPrompt }, ...messages],
          tools,
          tool_choice: 'required',
          stream,
        }),
      )

      if (stream) {
        const streamBody = new ReadableStream<Uint8Array>({
          async start(controller) {
            const encoder = new TextEncoder()
            for await (const chunk of response as any) {
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
      } else {
        // Return the complete response for handling function calls
        return new Response(JSON.stringify(response), {
          headers: {
            'Content-Type': 'application/json',
          },
        })
      }
    } catch (error) {
      console.error('Error calling Mistral API with functions:', error)
      return new Response(JSON.stringify({ error: 'Failed to process request with functions' }), {
        status: 500,
      })
    }
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
        messages: [{ role: 'system', content: systemPrompt }, ...messages],
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
