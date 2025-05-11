import OpenAI from 'openai'
import { MISTRAL_API_ENDPOINT_KEY, MISTRAL_API_KEY } from '../../utils/environment-variables.ts'
import type { ListeMessagesMistral } from '../../utils/types.ts'
import { callWithRetry } from '../utils/retryUtils.ts'
import { PRESENTATION_NIRINA_SYSTEM_PROMPT } from './system_prompt.ts'

const MODEL = 'mistral-small-2503'

interface AIClient {
  chatStream(
    messages: ListeMessagesMistral,
    tools: any[] | undefined,
    { stream }: { stream: boolean },
  ): Promise<unknown>
}

function getClient(variables: ChatFunctionArguments): AIClient {
  const client = new OpenAI({
    baseURL: variables.MISTRAL_API_ENDPOINT,
    apiKey: variables.apiKey,
  })

  return {
    chatStream: function (
      messages: ListeMessagesMistral,
      tools: any[] | undefined,
      { stream }: { stream: boolean },
    ) {
      return client.chat.completions.create({
        model: MODEL,
        messages: [{ role: 'system', content: PRESENTATION_NIRINA_SYSTEM_PROMPT }, ...messages],
        tools,
        tool_choice: tools ? 'required' : undefined,
        stream,
      })
    },
  }
}

type ChatFunctionArguments = Partial<{
  apiKey: string
  MISTRAL_API_ENDPOINT: string
}>

export function useChatFunction(variables: ChatFunctionArguments) {
  const client = getClient(variables)

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
      const response = await callWithRetry(() => client.chatStream(messages, tools, { stream }))

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
      client.chatStream(messages, undefined, { stream: true }),
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
