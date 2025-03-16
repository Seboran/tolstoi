import { type Ref, computed } from 'vue'

export interface WordPosition {
  word: string
  position: {
    x: number
    y: number
  }
}
export function useWordToPosition(words: Ref<string[]>) {
  const positions = computed(() =>
    words.value.map(
      (word): WordPosition => ({
        word,
        position: {
          x: getRandomPosition(word),
          y: getRandomPosition(word),
        },
      }),
    ),
  )
  return {
    positions,
  }
}
function getRandomPosition(_word: string): number {
  return (0.5 - Math.random()) * 200
}
