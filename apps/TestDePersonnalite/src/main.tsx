import { h, mountReactive } from 'nirina.js'
import { PersonalityTest } from './components/PersonalityTest'
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
