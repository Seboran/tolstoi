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
  // Check if native sharing is supported - requires secure context (HTTPS)
  const isNativeShareSupported = () => {
    return (
      typeof navigator !== 'undefined' &&
      'share' in navigator &&
      typeof navigator.share === 'function' &&
      window.isSecureContext // Required for Web Share API
    )
  }

  // Check if we're on mobile
  const isMobile = () => {
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }

  const shareResults = async () => {
    const shareText = `J'ai fait le test de personnalité des frameworks JavaScript ! Mon framework idéal est ${framework} ! 🚀`

    // Construct the share data according to Web Share API spec
    const shareData = {
      title: 'Test de Personnalité - Résultats',
      text: shareText,
      url: window.location.href,
    }

    // Check if sharing is supported and validate the data first
    if (!isNativeShareSupported()) {
      console.log('Web Share API not supported')
      return
    }

    // Validate share data before attempting to share (required by spec)
    if (navigator.canShare && !navigator.canShare(shareData)) {
      console.log('Share data is not valid for this platform')
      return
    }

    try {
      await navigator.share(shareData)
      console.log('Share successful')
    } catch (error) {
      // Handle specific error cases as per spec
      if (error.name === 'AbortError') {
        console.log('Share cancelled by user')
      } else if (error.name === 'NotAllowedError') {
        console.log('Share not allowed (user gesture required or permissions)')
      } else if (error.name === 'DataError') {
        console.log('Share data error')
      } else {
        console.log('Share failed:', error.name, error.message)
      }
    }
  }

  const shareToBluesky = () => {
    const shareText = `J'ai fait le test de personnalité des frameworks JavaScript ! Mon framework idéal est ${framework} ! 🚀 @nirinarabeson.fr`
    const shareUrl = window.location.href
    const blueskyUrl = `https://bsky.app/intent/compose?text=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`
    window.open(blueskyUrl, '_blank')
  }

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

      {/* Share buttons - always show on mobile, prioritize native iOS sharing */}
      <div class="share-section">
        <h4>Partager vos résultats :</h4>
        <div class="share-buttons">
          {isMobile() && (
            <button class="share-button native-share" onclick={shareResults}>
              📱 Partager
            </button>
          )}

          <button class="share-button bluesky-share" onclick={shareToBluesky}>
            🦋 Bluesky
          </button>
        </div>
      </div>
    </div>
  )
}
