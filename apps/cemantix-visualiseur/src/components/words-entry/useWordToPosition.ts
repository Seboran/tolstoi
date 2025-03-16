import { ofetch } from 'ofetch'
import { type Ref, computed, ref, watch } from 'vue'

export interface WordPosition {
  word: string
  position: {
    x: number
    y: number
  }
}
export function useWordToPosition(words: Ref<string[]>) {
  const positions = ref<WordPosition[]>([])
  watch(words, async () => {
    positions.value = await convertWords(words.value)
  })
  return {
    positions,
  }
}
async function convertWords(words: string[]): Promise<WordPosition[]> {
  const response = await ofetch<{ positions: [number, number][] }>(
    'http://localhost:5328/api/v2/word-to-position',
    {
      method: 'POST',
      body: JSON.stringify({ words }),
      parseResponse: JSON.parse,
    },
  )
  return response.positions.map((position, index) => ({
    word: words[index],
    position: {
      x: position[0],
      y: position[1],
    },
  }))
}
