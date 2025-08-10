import { h } from 'nirina.js'
import type { Component } from '../declarations'

export const PersonalityResults: Component<{
  results: Record<string, number>
  onRestart: () => void
}> = ({ results, onRestart }) => {
  // Find the framework with the highest score
  const sortedResults = Object.entries(results)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3) // Show top 3

  const topFramework = sortedResults[0]

  const getFrameworkDescription = (framework: string) => {
    const descriptions: Record<string, string> = {
      vue: 'Vue.js est fait pour vous ! Vous aimez un équilibre entre simplicité et puissance, avec une réactivité élégante.',
      reactjs:
        'React est votre match ! Vous appréciez la composition de composants et un écosystème riche.',
      angular:
        'Angular vous correspond ! Vous préférez un framework complet avec une architecture bien définie.',
      astro: 'Astro est parfait pour vous ! Vous valorisez les performances et le rendu statique.',
      solidjs:
        'SolidJS vous va comme un gant ! Vous aimez la réactivité fine et les performances optimales.',
      svelte: 'Svelte est fait pour vous ! Vous préférez la simplicité et des bundles légers.',
      qwik: 'Qwik vous correspond ! Vous êtes passionné par la performance et le chargement progressif.',
      alpine:
        'Alpine.js est votre style ! Vous aimez améliorer progressivement vos pages avec de la réactivité simple.',
      htmx: 'HTMX est parfait pour vous ! Vous préférez rester proche du HTML avec des interactions serveur simples.',
      ember: 'Ember vous correspond ! Vous appréciez les conventions et un framework mature.',
      stencil:
        'Stencil est fait pour vous ! Vous aimez créer des composants web standards réutilisables.',
    }
    return descriptions[framework] || 'Un excellent choix de framework !'
  }

  return (
    <div class="results-container">
      <h2>Vos résultats</h2>

      <div class="top-result">
        <h3>
          Votre framework idéal : <span class="framework-name">{topFramework[0]}</span>
        </h3>
        <p class="framework-description">{getFrameworkDescription(topFramework[0])}</p>
        <div class="score">
          Score de compatibilité : {Math.round((topFramework[1] * 100) / 30)}%
        </div>
      </div>

      <div class="all-results">
        <h4>Tous vos scores :</h4>
        <div class="results-list">
          {sortedResults.map(([framework, score]) => (
            <div class="result-item" key={framework}>
              <span class="result-framework">{framework}</span>
              <div class="result-bar">
                <div class="result-fill" style={`width: ${Math.round((score * 100) / 30)}%`}></div>
              </div>
              <span class="result-score">{Math.round((score * 100) / 30)}%</span>
            </div>
          ))}
        </div>
      </div>

      <button class="restart-button" onclick={onRestart}>
        Refaire le test
      </button>
    </div>
  )
}
