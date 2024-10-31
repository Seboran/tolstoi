import { suite, test, expect } from 'vitest'
import { visitArray } from '../visitArray'

suite('visitArray', () => {
  test('visite chaque élément du tableau', () => {
    const array = [
      [1, 2, 3],
      [4, 5, 6],
    ]
    const visited: number[] = []
    visitArray(array, (value) => visited.push(value))
    expect(visited).toEqual([1, 2, 3, 4, 5, 6])
  })
})
