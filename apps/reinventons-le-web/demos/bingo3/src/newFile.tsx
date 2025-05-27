import { AppContainer } from './components/AppContainer'
import { BingoTableau } from './components/BingoTableau'
import { Button } from './components/Button'
import { NumberInput } from './components/NumberInput'
import { StatusMessage } from './components/StatusMessage'
import { mountReactive } from './framework/renderer'
import { container, generateNewGrid, highlightNumber, highlighted, state } from './main'

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
