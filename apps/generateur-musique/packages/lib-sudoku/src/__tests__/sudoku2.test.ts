import { test, expect, describe } from 'vitest'
import { Sudoku2 } from '../sudoku2'
import { reglesSudoku } from '../regles-sudoku/reglesSudoku'
import { prettyPrintGrid } from './utils'

describe('sudoku 2', () => {
  test('doit trouver solution de la dernière case', () => {
    const sudoku = new Sudoku2()
    sudoku.initialize([
      [1, 2, 3, 4, 5, 6, 7, 8, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ])
    sudoku.valeurs = sudoku.accept(reglesSudoku)

    expect(sudoku.contexte).toEqual([
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ])
  })

  test('résout le sudoku', () => {
    const sudoku = new Sudoku2()
    sudoku.initialize([
      [0, 0, 0, 6, 9, 0, 4, 0, 0],
      [0, 2, 9, 0, 0, 5, 0, 0, 3],
      [0, 0, 1, 0, 3, 4, 0, 0, 8],
      [9, 8, 0, 0, 0, 1, 0, 7, 0],
      [2, 0, 7, 0, 6, 9, 0, 3, 1],
      [0, 0, 3, 2, 0, 7, 5, 4, 0],
      [8, 3, 0, 9, 0, 0, 0, 0, 7],
      [0, 0, 5, 0, 2, 0, 0, 0, 0],
      [1, 0, 6, 5, 7, 3, 0, 0, 4],
    ])
    sudoku.valeurs = sudoku.accept(reglesSudoku)
    sudoku.valeurs = sudoku.accept(reglesSudoku)
    sudoku.valeurs = sudoku.accept(reglesSudoku)
    sudoku.valeurs = sudoku.accept(reglesSudoku)
    sudoku.valeurs = sudoku.accept(reglesSudoku)
    expect(prettyPrintGrid(sudoku.contexte)).toEqual(
      prettyPrintGrid([
        [3, 7, 8, 6, 9, 2, 4, 1, 5],
        [4, 2, 9, 8, 1, 5, 7, 6, 3],
        [5, 6, 1, 7, 3, 4, 9, 2, 8],
        [9, 8, 4, 3, 5, 1, 6, 7, 2],
        [2, 5, 7, 4, 6, 9, 8, 3, 1],
        [6, 1, 3, 2, 8, 7, 5, 4, 9],
        [8, 3, 2, 9, 4, 6, 1, 5, 7],
        [7, 4, 5, 1, 2, 8, 3, 9, 6],
        [1, 9, 6, 5, 7, 3, 2, 8, 4],
      ]),
    )
  })
})
