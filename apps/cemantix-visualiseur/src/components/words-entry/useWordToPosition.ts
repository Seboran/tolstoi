import { ofetch } from 'ofetch'
import { type Ref, computed, ref, watch } from 'vue'

export interface WordPosition {
  word: string
  position: {
    x: number
    y: number
  }
}

const NORMALIZATION_FACTOR = 90

export function useWordToPosition(words: Ref<string[]>) {
  const positions = ref<WordPosition[]>([])
  watch(
    words,
    async () => {
      const trimedWords = words.value.map((w) => w.trim())
      const positionsToNormalize = await convertWords(trimedWords)
      const maxX = Math.max(...positionsToNormalize.map((p) => Math.abs(p.position.x)))
      const maxY = Math.max(...positionsToNormalize.map((p) => Math.abs(p.position.y)))
      positionsToNormalize.forEach((p) => {
        p.position.x /= maxX
        p.position.y /= maxY
        // Normalize to 100
        p.position.x *= NORMALIZATION_FACTOR
        p.position.y *= NORMALIZATION_FACTOR
      })
      positions.value = positionsToNormalize
    },
    { immediate: true },
  )
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
