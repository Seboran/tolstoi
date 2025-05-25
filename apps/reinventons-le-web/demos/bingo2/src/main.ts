import './style.css'
import { AppContainer } from './components/AppContainer'
import { BingoTableau } from './components/BingoTableau'
import { Button } from './components/Button'
import { NumberInput } from './components/NumberInput'
import { reactive, reactiveSet } from './framework/reactive'
import { mountReactive } from './framework/renderer'
import { generateBingoGrid } from './utils/bingo'

// Reactive state
const state = reactive({
  inputValue: '',
  bingoData: generateBingoGrid(4, 4, 1, 20),
})
const highlighted = reactiveSet<number>()

const container = document.getElementById('app')!

function highlightNumber() {
  const val = parseInt(state.inputValue)
  if (!isNaN(val)) {
    highlighted.add(val)
    state.inputValue = ''
  }
}

function generateNewGrid() {
  state.bingoData = generateBingoGrid(4, 4, 1, 20)
  highlighted.clear()
}

// Reactive render function
mountReactive(
  () =>
    AppContainer({
      children: [
        NumberInput({
          value: state.inputValue,
          placeholder: 'Enter number',
          onInput: (value) => (state.inputValue = value),
        }),
        Button({
          onClick: highlightNumber,
          children: 'Highlight',
        }),
        Button({
          onClick: generateNewGrid,
          children: 'New Grid',
        }),
        BingoTableau({ rows: state.bingoData, highlighted }),
      ],
    }),
  container,
)
