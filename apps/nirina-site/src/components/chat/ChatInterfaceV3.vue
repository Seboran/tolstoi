<script setup lang="ts">
import { ref } from 'vue'
import type { ListeMessagesMistral } from '../../../utils/types'
import ChatInterfaceTemplate from './ChatInterfaceTemplate.vue'
import { regexMap } from './regexMap'
import { useListeMessages } from './useListeMessages'

const { lienDernierArticle } = defineProps<{
  lienDernierArticle: string
}>()

const mistralAnswer = ref('')
const lienVersSuite = ref('')
const suggestedLinks = ref<string[]>([])
const bloquerSubmitDoublon = ref(false)

const { messages, ajouterMessageUser, ajouterMessageAssistant } = useListeMessages()

// Import routes and prepare tools for function calling
import listeRoutes from '../../server-functions/liste_routes.json'

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
      .map((toolCall) => {
        const functionName = toolCall.function?.name
        return functionName === 'rediriger_vers_dernier_article'
          ? lienDernierArticle
          : (listeRoutes[functionName] as any)?.href || ''
      })
      .filter((link) => link !== '')

    // Step 3 and 4: Second API call with function results
    const updatedMessages = [
      ...messages,
      {
        role: 'assistant',
        content: null,
        tool_calls: toolCalls,
      },
      ...toolCalls.map((tool) => {
        const functionName = tool.function?.name
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

    console.log('hrefs', hrefs)

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

// Updated fetchMistralResponse to handle both streaming and non-streaming responses
async function fetchMistralResponse(inputMessage: string) {
  if (bloquerSubmitDoublon.value) {
    return false
  }

  bloquerSubmitDoublon.value = true
  mistralAnswer.value = ''
  suggestedLinks.value = []

  ajouterMessageUser(inputMessage)

  try {
    const result = await fetchWithFunctionCalling(messages)

    if (result.hrefs && result.hrefs.length > 0) {
      suggestedLinks.value = result.hrefs
      if (result.hrefs.length === 1) {
        lienVersSuite.value = result.hrefs[0]
      }
    }

    // Handle the case where we got direct content (no streaming)
    if (result.content) {
      mistralAnswer.value = result.content
      ajouterMessageAssistant(mistralAnswer.value)
      return
    }

    // Handle streaming response
    if (!result.stream) {
      console.error('No stream available from the API')
      mistralAnswer.value =
        "Mon chatbot a un peu du mal 💀. N'hésitez pas à naviguer via le menu en haut !"
      return
    }

    const reader = result.stream.getReader()
    const decoder = new TextDecoder()
    let done = false

    while (!done) {
      const { value, done: readerDone } = await reader.read()
      done = readerDone
      if (value) {
        mistralAnswer.value += decoder.decode(value)
      }
    }

    ajouterMessageAssistant(mistralAnswer.value)
  } catch (error) {
    console.error('Error while fetching Mistral AI response:', error)
    mistralAnswer.value =
      "Mon chatbot a un peu du mal 💀. N'hésitez pas à naviguer via le menu en haut !"
  } finally {
    bloquerSubmitDoublon.value = false
  }
}

// Gestionnaire des redirections pour le chatbot
async function handleFormSubmit(inputMessage: string) {
  // Si le champ est vide, redirige vers le dernier article
  if (inputMessage.length === 0) {
    document.location.href = lienDernierArticle
    return false
  }

  // Now just use the function calling approach directly
  await fetchMistralResponse(inputMessage)
}
</script>
<template>
  <ChatInterfaceTemplate @submit="handleFormSubmit">
    <div v-if="mistralAnswer">
      <div class="text-black dark:text-white">
        <p v-if="mistralAnswer">
          {{ mistralAnswer }}
        </p>
      </div>

      <!-- Show a single recommended link -->
      <a
        v-if="lienVersSuite"
        :href="lienVersSuite"
        class="text-blue-800 hover:text-gray-800 dark:text-blue-200 dark:hover:text-gray-200"
      >
        <div class="my-1 py-1">
          <button type="button" class="button-levitation">
            Continuer vers {{ lienVersSuite }} &rarr;
          </button>
        </div>
      </a>

      <!-- Show multiple suggested links if available -->
      <div  v-if="suggestedLinks.length > 1" class="mt-4">
        <p class="font-medium mb-2">Liens suggérés :</p>
        <div class="flex flex-wrap gap-2">
          <a 
            v-for="(link, index) in suggestedLinks" 
            :key="index"
            :href="link"
            class="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
          >
            {{ link }}
          </a>
        </div>
      </div>
    </div>
  </ChatInterfaceTemplate>
</template>

<style>
@keyframes levitation {
  0%,
  100% {
    transform: translateY(0); /* Position de départ et de fin */
  }
  50% {
    transform: translateY(-1px); /* Léger mouvement vers le haut */
  }
}

.button-levitation {
  animation: levitation 3s infinite ease-in-out;
  transition: all 0.3s ease;
}
</style>
