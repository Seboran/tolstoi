<script setup lang="ts">
import { ref } from 'vue'
import type { ListeMessagesMistral } from '../../../utils/types'
import { PEPPERS_SYSTEM_PROMPT } from '../../server-functions/system_prompt'
import ChatInterfaceTemplate from './ChatInterfaceTemplate.vue'
import { regexMap } from './regexMap'
import { useListeMessages } from './useListeMessages'

const { lienDernierArticle } = defineProps<{
  lienDernierArticle: string
}>()

const mistralAnswer = ref('')

const lienVersSuite = ref('')

const bloquerSubmitDoublon = ref(false)

const { messages, ajouterMessageUser, ajouterMessageAssistant } = useListeMessages()

// Function to handle real-time SSE updates
async function fetchMistralResponse(inputMessage: string) {
  if (bloquerSubmitDoublon.value) {
    return false
  }

  bloquerSubmitDoublon.value = true
  mistralAnswer.value = ''

  ajouterMessageUser(inputMessage)

  try {
    const response = await fetch('/api/peppers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    })

    if (!response.body) {
      console.error('No response body from the SSE endpoint')
      mistralAnswer.value =
        "Mon chatbot a un peu du mal 💀. N'hésitez pas à naviguer via le menu en haut !"
      return
    }

    const reader = response.body.getReader()
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

  // Convertir l'entrée utilisateur en minuscules pour éviter les erreurs liées à la casse
  const lowerCaseInput = inputMessage.toLowerCase()

  // Parcourir la map pour trouver la première correspondance
  for (const { pattern, href } of regexMap(lienDernierArticle)) {
    if (pattern.test(lowerCaseInput)) {
      try {
        await fetchMistralResponse(inputMessage)
      } catch (e) {
        console.error(e)
      } finally {
        lienVersSuite.value = href
      }
      return
    }
  }
}
</script>
<template>
  <ChatInterfaceTemplate @submit="handleFormSubmit">
    <div v-if="mistralAnswer">
      <div class="text-black dark:text-white">
        <p v-if="mistralAnswer">
          <strong>Réponse :</strong> {{ mistralAnswer }}
        </p>
      </div>

      <a v-if="lienVersSuite" :href="lienVersSuite"
        class="text-blue-800 hover:text-gray-800 dark:text-blue-200 dark:hover:text-gray-200">
        <div class="my-1 py-1">
          <button type="button" class="button-levitation">
            Continuer vers {{ lienVersSuite }} &rarr;
          </button>
        </div>
      </a>
    </div>
    <template #suggestions>
    Voici les consignes qu'a reçu le chatbot :
    <p>
        {{ PEPPERS_SYSTEM_PROMPT }}
    </p></template>
  </ChatInterfaceTemplate>
</template>

<style>
@keyframes levitation {

  0%,
  100% {
    transform: translateY(0);
    /* Position de départ et de fin */
  }

  50% {
    transform: translateY(-1px);
    /* Léger mouvement vers le haut */
  }
}

.button-levitation {
  animation: levitation 3s infinite ease-in-out;
  transition: all 0.3s ease;
}
</style>
