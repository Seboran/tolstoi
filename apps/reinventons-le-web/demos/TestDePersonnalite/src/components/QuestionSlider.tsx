import type { Component } from '../declarations'
import { h } from '../framework/vdom'

export interface QuestionData {
  id: number
  text: string
  frameworks: Record<string, number> // framework name -> weight
}

export const QuestionSlider: Component<{
  question: QuestionData
  value: number
  onValueChange: (questionId: number, value: number) => void
}> = ({ question, value, onValueChange }) => {
  const handleSliderChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    const newValue = parseInt(target.value)

    // Find the current value display element and update it directly
    const currentValueEl = target.parentElement?.parentElement?.querySelector('.current-value')
    if (currentValueEl) {
      currentValueEl.textContent = `Votre réponse: ${getValueLabel(newValue)}`
    }

    onValueChange(question.id, newValue)
  }

  const getValueLabel = (val: number) => {
    switch (val) {
      case 1:
        return "Pas du tout d'accord"
      case 2:
        return "Pas d'accord"
      case 3:
        return 'Neutre'
      case 4:
        return "D'accord"
      case 5:
        return "Tout à fait d'accord"
      default:
        return 'Neutre'
    }
  }

  return (
    <div class="question-container">
      <h3 class="question-text">{question.text}</h3>
      <div class="slider-container">
        <label class="slider-label left">Pas du tout d'accord</label>
        <input
          type="range"
          min="1"
          max="5"
          value={String(value)}
          class="slider"
          oninput={handleSliderChange}
          onchange={handleSliderChange}
          ontouchmove={handleSliderChange}
        />
        <label class="slider-label right">Tout à fait d'accord</label>
      </div>
      <div class="current-value">Votre réponse: {getValueLabel(value)}</div>
    </div>
  )
}
