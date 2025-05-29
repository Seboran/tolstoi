import { BingoTableau } from './components/BingoTableau'
import { mount } from './framework/renderer'
import { h } from './framework/vdom'
import './style.css'
const container = document.getElementById('app')!

// Define the bingo grid data
const bingoData = [
  [5, 12, 1, 16],
  [9, 3, 11, 2],
  [14, 7, 4, 6],
  [8, 15, 10, 13],
]

const nombresCoches = [2]

const nombreCochesState = new Proxy(nombresCoches, {
  // get(target, key: string, receiver) {
  //   return Reflect.get(target, key, receiver)
  // },
  set(target, key: string, value, receiver) {
    const result = Reflect.set(target, key, value, receiver)
    renderBingoGame()
    return result
  },
})

// Mount the app with a 4x4 grid
renderBingoGame()

function renderBingoGame() {
  mount(
    <div class="main-app">
      <h1>Bingo</h1>
      <BingoTableau rows={bingoData} nombresCoches={nombreCochesState} />
    </div>,
    container,
  )
}
