import { PersonalityTest } from './components/PersonalityTest'
import { mountReactive } from './framework/renderer'
import { h } from './framework/vdom'
import './style.css'

const container = document.getElementById('app')!

// Use reactive mounting to automatically update when state changes
mountReactive(
  () => (
    <div class="main-app">
      <h1>Test de Personnalité - Frameworks Web</h1>
      <PersonalityTest />
    </div>
  ),
  container,
)
