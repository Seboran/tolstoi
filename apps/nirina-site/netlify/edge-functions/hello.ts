import type { Context, Config } from '@netlify/edge-functions'
import {
  MISTRAL_API_KEY,
  ENABLE_CHAT as ENABLE_CHAT_ENV,
} from '../../utils/environment-variables.ts'

const apiKey = Netlify.env.get(MISTRAL_API_KEY)
const ENABLE_CHAT = Netlify.env.get(ENABLE_CHAT_ENV)

interface ChatCompletionChunk {
  id: string
  object: string
  created: number
  model: string
  choices: {
    index: number
    delta: {
      content: string
      finish_reason?: string
    }
  }[]
}

export default async (request: Request, context: Context) => {
  if (!apiKey) throw 'MISTRAL_API_KEY is not set'

  if (!ENABLE_CHAT)
    return {
      statusCode: 405,
      body: JSON.stringify({
        error: 'There is no chat ATM',
      }),
    }
  const requestBody = await request.json()
  if (!requestBody) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Request body is missing',
      }),
    }
  }

  const encoder = new TextEncoder()
  const body = new ReadableStream({
    async start(controller) {
      try {
        const streamingEndpoint = 'https://api.mistral.ai/v1/agents/completions' // Replace with your endpoint
        const response = await fetch(streamingEndpoint, {
          method: 'POST', // Adjust the method as necessary
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            stream: true,
            messages: [
              {
                role: 'user',
                content: requestBody.message || 'Comment te contacter ?',
              },
            ],
            agent_id: 'ag:1ea80a65:20241206:chatbot-de-mon-blog:f9c1eeab',
          }),
        })

        if (!response.body) {
          throw new Error(
            'No response body received from the streaming endpoint.',
          )
        }
        const decoder = new TextDecoder()
        let buffer = ''

        for await (const chunk of response.body) {
          buffer += decoder.decode(chunk, { stream: true })
          let boundaryIndex

          // Process each complete SSE event
          while ((boundaryIndex = buffer.indexOf('\n\n')) !== -1) {
            const rawEvent = buffer.slice(0, boundaryIndex).trim()
            buffer = buffer.slice(boundaryIndex + 2)

            if (rawEvent === 'data: [DONE]') {
              controller.close()
              return
            }

            if (rawEvent.startsWith('data: ')) {
              try {
                const jsonData = JSON.parse(
                  rawEvent.slice(6),
                ) as ChatCompletionChunk
                const content = jsonData.choices.at(0)?.delta.content
                if (content) {
                  controller.enqueue(encoder.encode(content))
                }
              } catch (error) {
                console.error('Error parsing SSE event:', rawEvent, error)
              }
            }
          }
        }
        controller.close()
      } catch (error) {
        console.error('Error in streaming:', error)
        controller.error(error)
      }
    },
  })
  return new Response(body, {
    headers: {
      'Content-Type': 'text/event-stream',
    },
  })
}

export const config: Config = {
  path: '/api/chat',
}
