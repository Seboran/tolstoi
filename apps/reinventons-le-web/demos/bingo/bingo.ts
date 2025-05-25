const STATE_KEY = 'bingoStates'

export function BingoCase(nombre: number) {
  return `<td>${nombre}</td>`
}

export function BingoLigne() {
  const listeCases = [BingoCase(5), BingoCase(12), BingoCase(1), BingoCase(16)]

  return `<tr>${listeCases.join('')}</tr>`
}

export function BingoTableau() {
  const lignes = [BingoLigne(), BingoLigne(), BingoLigne(), BingoLigne()]

  return `<table class="bingo-tableau">${lignes.join('')}</table>`
}

export function afficherBingoTableau() {
  const bingoTableau = BingoTableau()
  const bingoContainer = document.getElementById('bingo-container')
  if (bingoContainer) {
    bingoContainer.innerHTML = bingoTableau
  }
}

export function BingoCase2(nombre: number) {
  return {
    template: `<td class="bingo-case">${nombre}</td>`,
  }
}

