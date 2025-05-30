import type { Component } from '../declarations'
import { h } from '../framework/vdom'

const frameworkDescriptions: Record<string, string> = {
  vue: "Vue.js - Un framework progressif qui combine simplicité et puissance. Parfait pour ceux qui aiment l'équilibre entre facilité d'apprentissage et fonctionnalités avancées.",
  reactjs:
    "React.js - La bibliothèque de Facebook pour construire des interfaces utilisateur. Idéal pour ceux qui aiment l'écosystème riche et la flexibilité.",
  angular:
    "Angular - Le framework complet de Google avec TypeScript par défaut. Parfait pour les applications d'entreprise complexes.",
  astro:
    'Astro - Le framework moderne pour des sites rapides. Idéal pour ceux qui privilégient les performances et le rendu statique.',
  solidjs:
    'Solid.js - La réactivité fine sans DOM virtuel. Parfait pour ceux qui veulent des performances maximales avec une syntaxe familière.',
  svelte:
    'Svelte - Le framework qui compile vers du JavaScript vanilla. Idéal pour ceux qui veulent simplicité et performances.',
  qwik: "Qwik - L'architecture resumable pour des applications instantanées. Parfait pour ceux qui veulent des temps de chargement ultra-rapides.",
  alpine:
    "Alpine.js - Le jQuery moderne pour ajouter de l'interactivité. Idéal pour améliorer progressivement des sites existants.",
  htmx: "HTMX - L'interactivité HTML native. Parfait pour ceux qui préfèrent rester proche du web platform.",
  ember:
    'Ember.js - Le framework avec des conventions fortes. Idéal pour les équipes qui aiment la structure et la productivité.',
  stencil:
    'Stencil - Le compilateur pour Web Components. Parfait pour créer des composants réutilisables et standards.',
  'vanilla js':
    'Vanilla JavaScript - Le langage du web dans sa forme la plus pure. Parfait pour ceux qui préfèrent le contrôle total, la simplicité et la compréhension profonde du fonctionnement du web.',
}

export const Results: Component<{
  framework: string
  onRestart: () => void
}> = ({ framework, onRestart }) => {
  return (
    <div class="results-container">
      <h2>Votre framework idéal est :</h2>
      <div class="result-framework">{framework}</div>
      <p class="result-description">
        {frameworkDescriptions[framework] || 'Un excellent choix pour vos projets web !'}
      </p>
      <button class="restart-button" onclick={onRestart}>
        Refaire le test
      </button>
    </div>
  )
}
