import { ref } from 'vue'
import { useFunctionCalling } from './useFunctionCalling'
import { useListeMessages } from './useListeMessages'

export function useMistralChat(lienDernierArticle: string) {
  const mistralAnswer = ref('')
  const lienVersSuite = ref('')
  const suggestedLinks = ref<string[]>([])
  const bloquerSubmitDoublon = ref(false)

  const { messages, ajouterMessageUser, ajouterMessageAssistant } = useListeMessages()
  const { fetchWithFunctionCalling } = useFunctionCalling(lienDernierArticle)

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
      // Spread messages array to convert readonly to mutable
      const result = await fetchWithFunctionCalling([...messages])

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

  return {
    mistralAnswer,
    lienVersSuite,
    suggestedLinks,
    bloquerSubmitDoublon,
    handleFormSubmit,
  }
}
