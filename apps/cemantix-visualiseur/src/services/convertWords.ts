import { ofetch } from 'ofetch'
import type { WordPosition } from '../components/words-entry/useWordToPosition'

const convertWordEndpoint = 'http://localhost:5328/api/word-to-position'

export async function convertWords(words: string[]): Promise<WordPosition[]> {
  try {
    const response = await ofetch<{ positions: [number, number][] }>(convertWordEndpoint, {
      method: 'POST',
      body: JSON.stringify({ words }),
      parseResponse: JSON.parse,
    })
    return response.positions.map((position, index) => ({
      word: words[index],
      position: {
        x: position[0],
        y: position[1],
      },
    }))
  } finally {
    //
  }
}
