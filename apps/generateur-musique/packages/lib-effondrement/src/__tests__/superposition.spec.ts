import { describe, test, expect } from 'vitest'
import { Superposition } from '../superposition'
import { Regle } from '../models/regle'

describe('Superposition', () => {
  test("Tester une superposition de nombres qui n'accepte que les nombres pairs", () => {
    const TestSuperpositionNombresPairs = new Superposition(
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      () => {},
    )
    class RegleNombresPairs extends Regle<number, void> {
      visit(superposition: Superposition<number, {}>): number[] {
        return superposition.solutions.filter((n) => n % 2 === 0)
      }
    }

    const resultat = TestSuperpositionNombresPairs.appliquer([
      new RegleNombresPairs(),
    ])
    expect(resultat.solutions).toEqual([2, 4, 6, 8, 10])
  })
  test('Tester une superposition de nombres qui doivent rester inférieurs à une valeur du contexte', async () => {
    const TestSuperpositionSeuil = new Superposition(
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      () => 5,
    )

    class RegleSeuil extends Regle<number, number> {
      visit(superposition: Superposition<number, number>): number[] {
        return superposition.solutions.filter(
          (n) => n < superposition.contextualisation(),
        )
      }
    }

    const resultat = TestSuperpositionSeuil.appliquer([new RegleSeuil()])
    expect(resultat.solutions).toEqual([1, 2, 3, 4])
  })

  test('Tester une superposition de valeurs qui doivent rester supérieures à une valeur contextualisée', async () => {
    const contexte = [1, 2, 3, 4]
    const TestSuperpositionCroissantContextualise = new Superposition(
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      () => contexte[2],
    )

    class RegleCroissant extends Regle<number, number> {
      visit(superposition: Superposition<number, number>): number[] {
        return superposition.solutions.filter(
          (n) => n >= superposition.contextualisation(),
        )
      }
    }

    const resultat = TestSuperpositionCroissantContextualise.appliquer([
      new RegleCroissant(),
    ])

    expect(resultat.solutions).toEqual([3, 4, 5, 6, 7, 8, 9, 10])
  })
})
