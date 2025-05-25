import './style.css'
import { AppContainer } from './components/AppContainer'
import { BingoTableau } from './components/BingoTableau'
import { Button } from './components/Button'
import { NumberInput } from './components/NumberInput'
import { StatusMessage } from './components/StatusMessage'
import { reactive, reactiveSet } from './framework/reactive'
import { mountReactive } from './framework/renderer'
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

console.log('About to mount reactive...')
// Reactive render function
mountReactive(() => {
  console.log('Render function called')
  return (
    <AppContainer>
      <StatusMessage message="This component uses the old h() function!" />
      <NumberInput
        value={state.inputValue}
        placeholder="Enter number"
        onInput={(value) => (state.inputValue = value)}
      />
      <Button onClick={highlightNumber}>Highlight</Button>
      <Button onClick={generateNewGrid}>New Grid</Button>
      <BingoTableau rows={state.bingoData} highlighted={highlighted} />
    </AppContainer>
  )
}, container)
