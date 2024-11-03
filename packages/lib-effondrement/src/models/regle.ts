import { Superposition } from '../superposition'
import type VisiteurSolution from '../interfaces/visiteurSolution'

export abstract class Regle<ValeursSuperposition, ResultatContextualisation>
  implements
    VisiteurSolution<
      Superposition<ValeursSuperposition, ResultatContextualisation>,
      ValeursSuperposition[]
    >
{
  /**
   * Retourn la liste des valeurs qui respectent la règle dans la superposition
   * @param superposition
   */
  abstract visit(
    superposition: Superposition<
      ValeursSuperposition,
      ResultatContextualisation
    >,
  ): ValeursSuperposition[]
}
