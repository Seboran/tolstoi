import { h, reactive } from 'nirina.js'
import type { Component } from '../declarations'
import { type QuestionData, QuestionSlider } from './QuestionSlider'
import { Results } from './Results'

const questions: QuestionData[] = [
  {
    id: 1,
    text: 'Les hooks me font me sentir libre',
    frameworks: {
      reactjs: 5,
      solidjs: 5,
      qwik: 5,
      vue: 4, // Composition API
      svelte: 3, // Reactive declarations
      astro: 3, // Can use hooks via integrations
      stencil: 2, // Class-based, decorators
      alpine: 2, // Directive-based
      angular: 1,
      ember: 1,
      htmx: 1,
      'vanilla js': 1,
    },
  },
  {
    id: 2,
    text: 'Le frontend me donne des sueurs froides, je préfère le backend',
    frameworks: {
      htmx: 5,
      astro: 4, // Content-focused, islands
      qwik: 4, // Resumability, server-first
      'vanilla js': 3, // Can be simple for simple tasks
      alpine: 2, // Minimal JS, but client-side
      svelte: 2,
      vue: 1,
      reactjs: 1,
      solidjs: 1,
      stencil: 1,
      angular: 1,
      ember: 1,
    },
  },
  {
    id: 3,
    text: "J'aime mes composants bien structurés et réutilisables",
    frameworks: {
      angular: 5,
      stencil: 5, // Web Components
      vue: 5,
      reactjs: 4,
      solidjs: 4,
      svelte: 4,
      ember: 4,
      qwik: 4,
      astro: 3, // Components via integrations
      'vanilla js': 2, // Possible with discipline
      alpine: 2, // Smaller scale components/directives
      htmx: 1, // HTML partials, less client-side components
    },
  },
  {
    id: 4,
    text: "Les DOM virtuels sont la meilleure façon de gérer les mises à jour de l'interface utilisateur",
    frameworks: {
      reactjs: 5,
      vue: 4,
      ember: 3, // Glimmer VM
      angular: 2, // Change detection, not traditional VDOM
      qwik: 2, // Resumability, different from VDOM
      svelte: 1, // Compiler, no VDOM
      solidjs: 1, // Fine-grained reactivity, no VDOM
      stencil: 1, // Direct DOM updates, no VDOM
      alpine: 1, // Direct DOM manipulation
      htmx: 1, // HTML over the wire
      astro: 1, // MPA, islands
      'vanilla js': 1, // Direct DOM
    },
  },
  {
    id: 5,
    text: "Je préfère pouvoir choisir toutes les briques de mon application plutôt que d'être contraint par un framework monolithique",
    frameworks: {
      'vanilla js': 5,
      reactjs: 5, // Ecosystem flexibility
      htmx: 4,
      alpine: 4,
      solidjs: 4,
      svelte: 3,
      astro: 3,
      vue: 2, // Can be progressive, but also more complete
      stencil: 2,
      qwik: 2,
      angular: 1,
      ember: 1,
    },
  },
  {
    id: 6,
    text: 'Je préfère quand mon framework implémente son parseur de templates plutôt que de m’obliger à utiliser JSX ou HTML pur',
    frameworks: {
      svelte: 5, // Unique template syntax
      vue: 5, // Custom template syntax
      angular: 4, // HTML-like templates
      ember: 4, // Handlebars
      alpine: 3, // HTML directives
      astro: 3, // Astro components syntax
      htmx: 2, // Enhances HTML
      'vanilla js': 1, // HTML pur
      reactjs: 1, // JSX
      solidjs: 1, // JSX
      qwik: 1, // JSX
      stencil: 1, // JSX
    },
  },
]

// Global reactive state for the test
const testState = reactive({
  currentQuestionIndex: 0,
  answers: {} as Record<number, number>,
  isCompleted: false,
})

const handleValueChange = (questionId: number, value: number) => {
  // Update the answers - this will automatically trigger reactivity
  testState.answers[questionId] = value
}

const handleNext = () => {
  if (testState.currentQuestionIndex < questions.length - 1) {
    testState.currentQuestionIndex++
  } else {
    testState.isCompleted = true
  }
}

const handleRestart = () => {
  testState.currentQuestionIndex = 0
  testState.answers = {} // Reset answers
  testState.isCompleted = false
}

const getCurrentAnswer = () => {
  const currentQuestion = questions[testState.currentQuestionIndex]
  return testState.answers[currentQuestion.id] ?? 3
}

const calculateResults = () => {
  const frameworkScores: Record<string, number> = {}

  // Initialize scores
  const frameworks = [
    'vue',
    'reactjs',
    'angular',
    'astro',
    'solidjs',
    'svelte',
    'qwik',
    'alpine',
    'htmx',
    'ember',
    'stencil',
    'vanilla js',
  ]
  frameworks.forEach((fw) => {
    frameworkScores[fw] = 0
  })

  // Calculate scores based on answers
  Object.entries(testState.answers).forEach(([questionIdStr, answer]) => {
    const questionId = parseInt(questionIdStr)
    const question = questions.find((q) => q.id === questionId)
    if (question) {
      Object.entries(question.frameworks).forEach(([framework, weight]) => {
        // Convert answer (1-5) to multiplier (0-1)
        const multiplier = (answer - 1) / 4
        frameworkScores[framework] += weight * multiplier
      })
    }
  })

  // Find the framework with the highest score
  const sortedFrameworks = Object.entries(frameworkScores).sort(([, a], [, b]) => b - a)

  return sortedFrameworks[0][0]
}

export const PersonalityTest: Component<{}> = () => {
  if (testState.isCompleted) {
    const winningFramework = calculateResults()
    return <Results framework={winningFramework} onRestart={handleRestart} />
  }

  const currentQuestion = questions[testState.currentQuestionIndex]
  const progress = ((testState.currentQuestionIndex + 1) / questions.length) * 100

  return (
    <div class="personality-test">
      <div class="progress-bar">
        <div class="progress-fill" style={`width: ${progress}%`}></div>
      </div>
      <QuestionSlider
        question={currentQuestion}
        value={getCurrentAnswer()}
        onValueChange={handleValueChange}
      />
      <button class="next-button" onclick={handleNext}>
        {testState.currentQuestionIndex === questions.length - 1
          ? 'Voir mon résultat'
          : 'Question suivante'}
      </button>
    </div>
  )
}
