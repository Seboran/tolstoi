import type VisiteurSolution from '../interfaces/visiteurSolution'
import type { Superposition } from '../superposition'

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
    superposition: Superposition<ValeursSuperposition, ResultatContextualisation>,
  ): ValeursSuperposition[]
}
