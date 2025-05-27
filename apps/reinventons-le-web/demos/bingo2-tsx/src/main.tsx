import './style.css'
import { AppContainer } from './components/AppContainer'
import { BingoTableau } from './components/BingoTableau'
import { reactive, reactiveSet } from './framework/reactive'
import { mount } from './framework/renderer'
import { h } from './framework/vdom'
import { generateBingoGrid } from './utils/bingo'

// Reactive state
const state = reactive({
  inputValue: '',
  bingoData: generateBingoGrid(4, 4, 1, 20),
})
const highlighted = reactiveSet<number>()

const container = document.getElementById('app')!
console.log('Container found:', container)

console.log('About to mount reactive...')
// Reactive render function
mount(
  <div class="main-app">
    <h1>Bingo</h1>
    <BingoTableau rows={state.bingoData} highlighted={highlighted} />
  </div>,
  container,
)
