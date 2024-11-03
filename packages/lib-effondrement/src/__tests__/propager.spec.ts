import { describe, expect, test } from 'vitest'
import { Regle } from '../models/regle'
import { Superposition } from '../superposition'
import { PropagateurSolution } from '../propager'

describe('Propager', () => {
  test('Propager deux règles', () => {
    class Regle1 extends Regle<number, void> {
      visit(superposition: Superposition<number, {}>): number[] {
        return superposition.solutions.filter((n) => n % 2 === 0)
      }
    }
    class Regle2 extends Regle<number, void> {
      visit(superposition: Superposition<number, {}>): number[] {
        return superposition.solutions.filter((n) => n % 3 === 0)
      }
    }

    const deuxRegles = new PropagateurSolution<number, void>([
      new Regle1(),
      new Regle2(),
    ])

    const nouvelleSuperposition = deuxRegles.visit([
      new Superposition([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], () => {}),
    ])

    expect(nouvelleSuperposition).toEqual([
      new Superposition([6, 12], () => {}),
    ])
  })
})
