import { describe, expect, test } from 'vitest'
import { PropagateurSolution } from '../propager'
import { Regle } from '../models/regle'
import { Solution } from '../solution'
import { Superposition } from '../superposition'

class RegleMultipleDuPremier extends Regle<number, TypeValeursNombres> {
  visit(
    superposition: Superposition<
      number,
      {
        valeurInitiale: 0
      }
    >,
  ): number[] {
    return superposition.solutions.filter(
      (solution) =>
        solution % superposition.contextualisation().valeurInitiale === 0,
    )
  }
}

type TypeValeursNombres = Partial<{
  valeurInitiale: number
  valeurPrecedente?: number
}>

describe('Solution', () => {
  test('doit propager les solutions possibles sur la règle les nombres doivent être un multiple du premier de la liste', () => {
    class MultipleDuPremier extends Solution<
      number,
      Partial<{ valeurInitiale: number; valeurPrecedente: number }>,
      (number | undefined)[]
    > {
      constructor() {
        const contexte = [3, undefined, undefined, undefined]
        super(
          [
            new Superposition([3], () => ({ valeurInitiale: contexte[0] })),
            new Superposition([1, 2, 4, 6], () => ({
              valeurInitiale: contexte[0],
            })),
            new Superposition([3, 4, 5, 6, 9], () => ({
              valeurInitiale: contexte[0],
            })),
            new Superposition([4, 5, 7], () => ({
              valeurInitiale: contexte[0],
            })),
          ],
          [3, undefined, undefined, undefined],
        )
      }

      setContexte() {
        this.contexte = this.valeurs.map((superposition) =>
          superposition.solutions.length === 1
            ? superposition.solutions[0]
            : undefined,
        )
      }
    }
    const multipleDuPremier = new MultipleDuPremier()

    const propagateurSolutions = new PropagateurSolution<
      number,
      TypeValeursNombres
    >([new RegleMultipleDuPremier()])

    const meilleuresSolutions = multipleDuPremier.accept(propagateurSolutions)

    const nouveauContexte = [3, 6, undefined, undefined]
    expect(meilleuresSolutions).toEqual([
      new Superposition([3], () => {}),
      new Superposition([6], () => {}),
      new Superposition([3, 6, 9], () => {}),
      new Superposition([], () => {}),
    ])
    expect(multipleDuPremier.contexte).toEqual(nouveauContexte)
  })

  test('doit avoir les règles du multiple de nombre et être strictement croissant', () => {
    class MultipleDuPremierCroissant extends Solution<
      number,
      TypeValeursNombres,
      (number | undefined)[]
    > {
      constructor() {
        super(
          [
            new Superposition([3], () => ({
              valeurInitiale: this.contexte[0],
              valeurPrecedente: undefined,
            })),
            new Superposition([1, 2, 4, 6], () => ({
              valeurInitiale: this.contexte[0],
              valeurPrecedente: this.contexte[0],
            })),
            new Superposition(
              [3, 4, 5, 6, 9],

              () => ({
                valeurInitiale: this.contexte[0],
                valeurPrecedente: this.contexte[1],
              }),
            ),
            new Superposition([4, 5, 7], () => ({
              valeurInitiale: this.contexte[0],
              valeurPrecedente: this.contexte[2],
            })),
          ],
          [3, undefined, undefined, undefined],
        )
      }

      setContexte() {
        this.contexte = this.valeurs.map((superposition) =>
          superposition.solutions.length === 1
            ? superposition.solutions[0]
            : undefined,
        )
      }
    }
    const multipleDuPremier = new MultipleDuPremierCroissant()

    class StrictementSuperieur extends Regle<number, TypeValeursNombres> {
      visit(
        superposition: Superposition<number, { valeurPrecedente?: number }>,
      ): number[] {
        return superposition.solutions.filter(
          (solution) =>
            solution >
            (superposition.contextualisation().valeurPrecedente ?? 0),
        )
      }
    }

    const propagateurSolutions = new PropagateurSolution<
      number,
      TypeValeursNombres
    >([new RegleMultipleDuPremier(), new StrictementSuperieur()])

    multipleDuPremier.valeurs = multipleDuPremier.accept(propagateurSolutions)
    const meilleuresSolutions = multipleDuPremier.accept(propagateurSolutions)

    const nouveauContexte = [3, 6, 9, undefined]
    expect(meilleuresSolutions).toEqual([
      new Superposition([3], () => nouveauContexte),
      new Superposition([6], () => nouveauContexte),
      new Superposition([9], () => nouveauContexte),
      new Superposition([], () => nouveauContexte),
    ])
  })
})
