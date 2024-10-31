import { Regle } from './models/regle'
import { Superposition } from './superposition'
import type VisiteurSolution from './interfaces/visiteurSolution'

export class PropagateurSolution<
  ValeursSuperposition,
  ResultatContextualisation,
> implements
    VisiteurSolution<
      Superposition<ValeursSuperposition, ResultatContextualisation>[],
      Superposition<ValeursSuperposition, ResultatContextualisation>[]
    >
{
  constructor(
    protected regles: Regle<ValeursSuperposition, ResultatContextualisation>[],
  ) {}
  visit(
    solutionSpace: Superposition<
      ValeursSuperposition,
      ResultatContextualisation
    >[],
  ): Superposition<ValeursSuperposition, ResultatContextualisation>[] {
    return solutionSpace.map((solution) => solution.appliquer(this.regles))
  }
}
