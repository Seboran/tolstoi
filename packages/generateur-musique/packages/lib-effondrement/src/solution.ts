import { PropagateurSolution } from './propager'
import { Superposition } from './superposition'

export abstract class Solution<
  ValeursSuperposition,
  ResultatContextualisation,
  Contexte,
> {
  constructor(
    public valeurs: Superposition<
      ValeursSuperposition,
      ResultatContextualisation
    >[],
    public contexte: Contexte,
  ) {}
  public accept(
    visiteur: PropagateurSolution<
      ValeursSuperposition,
      ResultatContextualisation
    >,
  ): Superposition<ValeursSuperposition, ResultatContextualisation>[] {
    this.valeurs = visiteur.visit(this.valeurs)
    this.setContexte()
    return this.valeurs
  }

  abstract setContexte(): void
}
