export function visitArray<T>(
  array: T[][],
  callback: (value: T, i: number, j: number) => void,
) {
  for (let i = 0; i < array.length; i++) {
    const row = array[i]
    for (let j = 0; j < row.length; j++) {
      const value = row[j]
      callback(value, i, j)
    }
  }
}
