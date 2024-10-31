export function gridToArray<T>(grid: T[][]) {
  return grid.flatMap((row) => row)
}

export function arrayToGrid<T>(list: T[]): T[][] {
  const grid: T[][] = []
  for (let i = 0; i < 9; i++) {
    grid.push(list.slice(i * 9, (i + 1) * 9))
  }
  return grid
}
