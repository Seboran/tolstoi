import type { ListeMessagesMistral } from '../../../utils/types'
import listeRoutes from '../../server-functions/liste_routes.json'

export function useFunctionCalling(lienDernierArticle: string) {
  // Function to prepare tools for OpenAI API, similar to Python's prepare_tools
  function prepareTools() {
    return Object.entries(listeRoutes).map(([name, func]) => ({
      type: 'function',
      function: {
        name,
        description: (func as any).description,
        parameters: {
          type: 'object',
          properties: {},
          additionalProperties: false,
        },
      },
    }))
  }

  // Function calling implementation for Mistral API
  async function fetchWithFunctionCalling(messages: ListeMessagesMistral) {
    const tools = prepareTools()

    // Step 1: Initial API call with tools
    const initialResponse = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        tools,
        stream: false,
      }),
    })

    if (!initialResponse.ok) {
      throw new Error('Failed to fetch from API')
    }

    const initialResult = await initialResponse.json()
    const toolCalls = initialResult.choices?.[0]?.message?.tool_calls || []

    // Step 2: Process function calls to get hrefs
    if (toolCalls && toolCalls.length > 0) {
      // Compute hrefs for all tool calls
      const hrefs = toolCalls
        .map((toolCall: { function: { name: any } }) => {
          const functionName = toolCall.function?.name as keyof typeof listeRoutes
          return functionName === 'rediriger_vers_dernier_article'
            ? lienDernierArticle
            : listeRoutes[functionName]?.href || ''
        })
        .filter((link: string) => link !== '')

      // Step 3 and 4: Second API call with function results
      const updatedMessages = [
        ...messages,
        {
          role: 'assistant',
          content: null,
          tool_calls: toolCalls,
        },
        ...toolCalls.map((tool: { function: { name: any }; id: any }) => {
          const functionName: keyof typeof listeRoutes = tool.function?.name
          return {
            role: 'tool',
            tool_call_id: tool.id,
            content:
              functionName && listeRoutes[functionName]
                ? (listeRoutes[functionName] as any).href
                : '',
          }
        }),
      ]

      const finalResponse = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedMessages,
          stream: true,
        }),
      })

      return {
        stream: finalResponse.body,
        hrefs,
      }
    }

    // If no function calls, just use the content from the initial response
    return {
      content: initialResult.choices?.[0]?.message?.content || '',
      hrefs: [],
    }
  }

  return {
    fetchWithFunctionCalling,
  }
}
