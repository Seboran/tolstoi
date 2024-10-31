import { type SudokuCellule } from 'lib-sudoku'

const notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4']
export const numberToNote = (number: SudokuCellule) => {
  if (!number) {
    return 'C4'
  }
  return notes[(number - 1) % 7]
}
