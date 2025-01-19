import type VisiteurSolution from './interfaces/visiteurSolution'
import type { Regle } from './models/regle'
import type { Superposition } from './superposition'

export class PropagateurSolution<ValeursSuperposition, ResultatContextualisation>
  implements
    VisiteurSolution<
      Superposition<ValeursSuperposition, ResultatContextualisation>[],
      Superposition<ValeursSuperposition, ResultatContextualisation>[]
    >
{
  constructor(protected regles: Regle<ValeursSuperposition, ResultatContextualisation>[]) {}
  visit(
    solutionSpace: Superposition<ValeursSuperposition, ResultatContextualisation>[],
  ): Superposition<ValeursSuperposition, ResultatContextualisation>[] {
    return solutionSpace.map((solution) => solution.appliquer(this.regles))
  }
}
