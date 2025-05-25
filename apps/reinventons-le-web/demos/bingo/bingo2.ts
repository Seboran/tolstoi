export interface DevLilleComposant<T> {
  (props: T): { template: string }
}

export const BingoCase: DevLilleComposant<number> = (nombre) => {
  return {
    template: `<td class="bingo-case">${nombre}</td>`,
  }
}

export const BingoLigne: DevLilleComposant<number[]> = (nombres) => {
  return {
    template: `<tr>${nombres.map((nombre) => BingoCase(nombre))}</tr>`,
  }
}

export const BingoTableau: DevLilleComposant<number[][]> = (lignes) => {
  return {
    template: `<table class="bingo-tableau">${lignes.map(BingoLigne).join('')}</table>`,
  }
}
