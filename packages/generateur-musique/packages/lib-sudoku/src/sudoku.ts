import { visitArray } from './utils/visitArray'

export type SudokuCellule = number | null
export type SudokuGrid = SudokuCellule[][]
export type SudokuPossibilitesCellule = number[]

export class Sudoku {
  grid: SudokuCellule[][]
  possibilitesGrid: SudokuPossibilitesCellule[][]

  constructor() {
    // Initialisation du tableau 9x9 avec des valeurs null
    this.grid = Array.from({ length: 9 }, () => Array(9).fill(null))
    this.possibilitesGrid = Array.from({ length: 9 }, () =>
      Array(9).fill([1, 2, 3, 4, 5, 6, 7, 8, 9]),
    )
  }

  private removePossibilitesCaseRemplie(): void {
    visitArray(this.grid, (value, i, j): void => {
      if (value !== 0) {
        this.removePossibilites(i, j)
      }
    })
  }

  private removePossibilites(i: number, j: number) {
    this.possibilitesGrid[i][j] = []
  }

  initialize(puzzle: SudokuCellule[][]) {
    if (puzzle.length !== 9 || puzzle.some((row) => row.length !== 9)) {
      throw new Error('Invalid puzzle')
    }
    this.grid = puzzle
    this.removePossibilitesCaseRemplie()
    this.diffuserPropagation()
  }

  collapseWaveFunction(): SudokuGrid {
    this.diffuserPropagation()
    return this.remplirPropagation()
  }

  private remplirPropagation(): SudokuGrid {
    // Itérer sur chaque cellule du sudoku
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        // Si la cellule est vide (représentée par 0)
        if (this.grid[i][j] === 0) {
          // Générer une liste de possibilités pour cette cellule
          const possibilities = this.possibilitesGrid[i][j]
          // Si il n'y a qu'une seule possibilité, la choisir
          this.remplirGrilleSiPossible(possibilities, i, j)
        }
      }
    }
    this.remplirSiOptionUnique()

    return this.grid
  }

  private diffuserPropagation(): SudokuPossibilitesCellule[][] {
    // Itérer sur chaque cellule du sudoku
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        // Si la cellule est vide (représentée par 0)
        if (this.grid[i][j] === 0) {
          // Générer une liste de possibilités pour cette cellule
          const possibilities = this.getPossibilities(this.grid, i, j)
          // Si il n'y a qu'une seule possibilité, la choisir
          this.possibilitesGrid[i][j] = [...possibilities]
        }
      }
    }
    return this.possibilitesGrid
  }

  private remplirGrilleSiPossible(
    possibilities: number[],
    i: number,
    j: number,
  ) {
    if (possibilities.length === 1) {
      this.grid[i][j] = possibilities[0]
      this.removePossibilites(i, j)
      this.diffuserPropagation()
    }
  }
  /**
   * Le but de cette méthode est de parcourir la grille.
   * Si une option est interdite dans toutes les cases de la ligne sauf une,
   * alors cette case doit contenir cette option.
   * Pareillement pour les colonnes et les carrés de sudoku.
   */
  remplirSiOptionUnique(): void {
    // Itérer sur chaque ligne du sudoku
    for (let i = 0; i < 9; i++) {
      // Itérer sur chaque option possible
      for (let num = 1; num <= 9; num++) {
        let countLigne = 0
        let lastPossibleIndex = 0
        // Itérer sur chaque cellule de la ligne
        for (let j = 0; j < 9; j++) {
          // Si la cellule est vide (représentée par 0)
          if (this.grid[i][j] === 0) {
            // Vérifier si l'option est possible
            if (
              this.possibilitesGrid[i][j].includes(num) &&
              this.isValid(this.grid, i, j, num)
            ) {
              countLigne++
              lastPossibleIndex = j
            }
          }
        }
        if (countLigne === 1) {
          this.grid[i][lastPossibleIndex] = num
          this.removePossibilites(i, lastPossibleIndex)
          this.diffuserPropagation()
        }
        let countColonne = 0
        // Itérer sur chaque colonne de la cellule
        for (let j = 0; j < 9; j++) {
          // Si la cellule est vide (représentée par 0)
          if (this.grid[j][i] === 0 && this.isValid(this.grid, j, i, num)) {
            // Vérifier si l'option est possible
            if (this.possibilitesGrid[j][i].includes(num)) {
              countColonne++
              lastPossibleIndex = j
            }
          }
        }
        if (countColonne === 1) {
          this.grid[lastPossibleIndex][i] = num
          this.removePossibilites(lastPossibleIndex, i)
          this.diffuserPropagation()
        }
      }
    }
  }

  private getPossibilities(
    sudoku: SudokuGrid,
    row: number,
    col: number,
  ): number[] {
    const possibilities: number[] = []

    // Vérifier chaque nombre de 1 à 9
    for (let num = 1; num <= 9; num++) {
      if (this.isValid(sudoku, row, col, num)) {
        possibilities.push(num)
      }
    }
    return possibilities
  }

  private isValid(
    sudoku: SudokuGrid,
    row: number,
    col: number,
    num: number,
  ): boolean {
    // Vérifier la ligne
    for (let i = 0; i < 9; i++) {
      if (sudoku[row][i] === num) {
        return false
      }
    }
    // Vérifier la colonne
    for (let i = 0; i < 9; i++) {
      if (sudoku[i][col] === num) {
        return false
      }
    }
    // Vérifier le bloc 3x3
    const startRow = row - (row % 3)
    const startCol = col - (col % 3)
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (sudoku[i + startRow][j + startCol] === num) {
          return false
        }
      }
    }
    return true
  }
}
