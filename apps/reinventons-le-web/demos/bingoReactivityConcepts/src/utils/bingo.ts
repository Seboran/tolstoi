export function generateBingoGrid(
  rows: number = 4,
  cols: number = 4,
  min: number = 1,
  max: number = 20,
): number[][] {
  const numbers = new Set<number>()

  // Generate unique random numbers
  while (numbers.size < rows * cols) {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min
    numbers.add(randomNum)
  }

  const numbersArray = Array.from(numbers)
  const grid: number[][] = []

  // Organize numbers into a grid
  for (let i = 0; i < rows; i++) {
    const row: number[] = []
    for (let j = 0; j < cols; j++) {
      row.push(numbersArray[i * cols + j])
    }
    grid.push(row)
  }

  return grid
}
