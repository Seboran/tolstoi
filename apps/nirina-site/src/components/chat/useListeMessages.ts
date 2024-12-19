import { readonly, ref } from 'vue'
import type { ListeMessagesMistral } from '../../../utils/types'

export function useListeMessages() {
  const listeMessages = ref<ListeMessagesMistral>([])

  /**
   * Ajouter un message qui aura le rôle 'user' pour mistral
   * @param message
   */
  function ajouterMessageUser(message: string) {
    listeMessages.value.push({ role: 'user', content: message })
  }

  /**
   * Ajouter un message qui aura le rôle 'assistant' pour mistral
   * @param message
   */
  function ajouterMessageAssistant(message: string) {
    listeMessages.value.push({ role: 'assistant', content: message })
  }

  const messages = readonly(listeMessages.value)

  return {
    messages,
    ajouterMessageUser,
    ajouterMessageAssistant,
  }
}
