import { type Ref, ref, watch } from 'vue'
import { convertWords } from '../../services/convertWords'

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
