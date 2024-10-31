import { Superposition } from 'lib-effondrement'
import { describe, expect, test } from 'vitest'
import {
  RegleCarre,
  RegleColonne,
  RegleLigne,
  reglesSudoku,
} from '../reglesSudoku'

describe('Règle ligne sudoku', () => {
  test('Trouver la solution manquante pour la ligne', () => {
    const regleLigne = new RegleLigne()
    const nouvelleSuperposition = regleLigne.visit(
      new Superposition([1, 2, 3, 4, 5, 6, 7, 8], () => ({
        carre: [],
        ligne: [0, 1, 2],
        colonne: [],
      })),
    )

    expect(nouvelleSuperposition).toEqual([3, 4, 5, 6, 7, 8])
  })

  test('Trouver la solution manquante la colonne', () => {
    const regleLigne = new RegleColonne()
    const nouvelleSuperposition = regleLigne.visit(
      new Superposition([1, 2, 3, 4, 5, 6, 7, 8], () => ({
        carre: [],
        ligne: [],
        colonne: [1, 2],
      })),
    )

    expect(nouvelleSuperposition).toEqual([3, 4, 5, 6, 7, 8])
  })

  test('Trouver la solution manquante pour le carré', () => {
    const regleLigne = new RegleCarre()
    const nouvelleSuperposition = regleLigne.visit(
      new Superposition([1, 2, 3, 4, 5, 6, 7, 8], () => ({
        carre: [1, 2],
        ligne: [],
        colonne: [],
      })),
    )

    expect(nouvelleSuperposition).toEqual([3, 4, 5, 6, 7, 8])
  })

  test('Trouver la solution manquante pour plusieurs règles', () => {
    const nouvelleSuperposition = reglesSudoku.visit([
      new Superposition([1, 2, 3, 4, 5, 6, 7, 8, 9], () => ({
        carre: [1, 2, 3],
        ligne: [4, 5],
        colonne: [6, 2, 7, 8],
      })),
    ])

    expect(nouvelleSuperposition[0].solutions).toEqual([9])
  })
  test('Trouver la solution manquante pour plusieurs règles', () => {
    const nouvelleSuperposition = reglesSudoku.visit([
      new Superposition([1, 2, 3, 4, 5, 6, 7, 8, 9], () => ({
        carre: [1, 2, 3, 0, 0, 0, 0, 0, 0],
        colonne: [2, 0, 0, 0, 0, 0, 0, 0, 0],
        ligne: [1, 2, 3, 4, 5, 6, 7, 8, 0],
      })),
    ])

    expect(nouvelleSuperposition[0].solutions).toEqual([9])
  })
})
