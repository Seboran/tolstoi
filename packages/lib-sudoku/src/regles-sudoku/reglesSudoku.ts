import { Regle, Superposition } from 'lib-effondrement'
import { PropagateurSolution } from 'lib-effondrement/src/propager'
import { type ResultatContextualisationSudoku } from '../models/resultatContextualisation.model'
import { type SudokuCellule } from '../sudoku2'

export class RegleLigne implements Regle<SudokuCellule, ResultatContextualisationSudoku> {
  visit(
    superposition: Superposition<SudokuCellule, ResultatContextualisationSudoku>,
  ): SudokuCellule[] {
    return superposition.solutions.filter(
      (solution) => solution && !superposition.contextualisation().ligne.includes(solution),
    )
  }
}

export class RegleColonne implements Regle<SudokuCellule, ResultatContextualisationSudoku> {
  visit(
    superposition: Superposition<SudokuCellule, ResultatContextualisationSudoku>,
  ): SudokuCellule[] {
    return superposition.solutions.filter(
      (solution) => solution && !superposition.contextualisation().colonne.includes(solution),
    )
  }
}

export class RegleCarre implements Regle<SudokuCellule, ResultatContextualisationSudoku> {
  visit(
    superposition: Superposition<SudokuCellule, ResultatContextualisationSudoku>,
  ): SudokuCellule[] {
    return superposition.solutions.filter(
      (solution) => solution && !superposition.contextualisation().carre.includes(solution),
    )
  }
}

export const reglesSudoku = new PropagateurSolution([
  new RegleLigne(),
  new RegleCarre(),
  new RegleColonne(),
])
