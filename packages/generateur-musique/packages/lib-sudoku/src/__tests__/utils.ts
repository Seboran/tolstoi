import { SudokuGrid } from '../sudoku2'

export function prettyPrintGrid(grid: SudokuGrid): string {
  return grid.map((row) => `[${row.join(',')}]`).join('\n')
}
