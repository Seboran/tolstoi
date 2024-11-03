import { Solution, Superposition } from 'lib-effondrement'
import { type ResultatContextualisationSudoku } from './models/resultatContextualisation.model'
import { arrayToGrid, gridToArray } from './utils/gridToArray'

export type SudokuCellule = number | null
export type SudokuGrid = SudokuCellule[][]
export type SudokuPossibilitesCellule = number[]

export class Sudoku2 extends Solution<
  SudokuCellule,
  ResultatContextualisationSudoku,
  SudokuGrid
> {
  constructor() {
    super(
      gridToArray(
        Array.from({ length: 9 }, (_, index) =>
          Array.from(
            { length: 9 },
            (_, index2) =>
              new Superposition([1, 2, 3, 4, 5, 6, 7, 8, 9], () =>
                this.getLigneColonneCarreFromIndexes(index, index2),
              ),
          ),
        ),
      ),
      Array.from({ length: 9 }, () => Array(9).fill(null)),
    )
  }

  initialize(puzzle: SudokuCellule[][]) {
    if (puzzle.length !== 9 || puzzle.some((row) => row.length !== 9)) {
      throw new Error('Invalid puzzle')
    }
    this.contexte = puzzle
    this.setSuperpositions(puzzle)
  }

  setSuperpositions(puzzle: SudokuGrid) {
    gridToArray(puzzle).forEach((value, index) => {
      if (value !== null && value !== 0) {
        this.valeurs[index].solutions = [value]
      }
    })
  }

  private getLigneColonneCarreFromIndexes(
    row: number,
    column: number,
  ): ResultatContextualisationSudoku {
    const carre: SudokuCellule[] = []
    const ligne: SudokuCellule[] = []
    const colonne: SudokuCellule[] = []

    for (let i = 0; i < 9; i++) {
      const valeur = this.contexte[row][i]
      if (valeur !== null && i !== column) {
        ligne.push(valeur)
      }
    }

    for (let i = 0; i < 9; i++) {
      const valeur = this.contexte[i][column]
      if (valeur !== null && i !== row) {
        colonne.push(valeur)
      }
    }

    const carreRow = Math.floor(row / 3)
    const carreColumn = Math.floor(column / 3)
    for (let i = carreRow * 3; i < carreRow * 3 + 3; i++) {
      for (let j = carreColumn * 3; j < carreColumn * 3 + 3; j++) {
        const valeur = this.contexte[i][j]
        if (valeur !== null && i !== row && j !== column) {
          carre.push(valeur)
        }
      }
    }

    return {
      carre,
      ligne,
      colonne,
    }
  }

  setContexte(): void {
    this.contexte = arrayToGrid(
      this.valeurs.map((superposition) =>
        superposition.solutions.length === 1 ? superposition.solutions[0] : 0,
      ),
    )
  }
}
