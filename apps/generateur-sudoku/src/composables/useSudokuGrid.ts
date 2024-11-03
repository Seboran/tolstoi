import { Sudoku2, type SudokuGrid, reglesSudoku } from 'lib-sudoku'
import { ref, watch } from 'vue'

export function useSudokuGrid() {
  const initialSudokuGrid: SudokuGrid = [
    [0, 0, 0, 6, 9, 0, 4, 0, 0],
    [0, 2, 9, 0, 0, 5, 0, 0, 3],
    [0, 0, 1, 0, 3, 4, 0, 0, 8],
    [9, 8, 0, 0, 0, 1, 0, 7, 0],
    [2, 0, 7, 0, 6, 9, 0, 3, 1],
    [0, 0, 3, 2, 0, 7, 5, 4, 0],
    [8, 3, 0, 9, 0, 0, 0, 0, 7],
    [0, 0, 5, 0, 2, 0, 0, 0, 0],
    [1, 0, 6, 5, 7, 3, 0, 0, 4],
  ]
  const initialSudoku = new Sudoku2()
  initialSudoku.initialize(initialSudokuGrid)
  const sudoku = ref<Sudoku2>(initialSudoku)

  function propager() {
    sudoku.value.valeurs = sudoku.value.accept(reglesSudoku)
  }

  watch(
    () => sudoku.value.contexte,
    (value) => sudoku.value.setSuperpositions(value),
    { deep: true },
  )

  return { sudoku, propager }
}

const initialSudokuGrid: SudokuGrid = [
  [0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 7, 0, 0, 0, 0],
  [9, 0, 0, 0, 0, 0, 8, 0, 0],
  [0, 0, 2, 0, 0, 1, 0, 0, 0],
  [0, 5, 9, 4, 0, 7, 2, 6, 1],
  [0, 1, 0, 0, 0, 2, 0, 3, 0],
  [1, 0, 0, 0, 4, 0, 0, 0, 0],
  [0, 0, 3, 0, 0, 0, 0, 1, 0],
  [0, 2, 0, 0, 1, 0, 0, 0, 0],
]
