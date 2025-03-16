import { type Ref, watch } from 'vue'
import type { WordPosition } from '../components/words-entry/useWordToPosition'
import { useArrowDrawing } from './useArrowDrawing'

export interface CanvasState {
  drawWordsOnCanvas: () => void
}

export interface CanvasOptions {
  positions: Ref<WordPosition[]>
  animate: Ref<boolean>
  visibleCount: Ref<number>
  onAnimationComplete: () => void
}

export function useCanvasRendering(
  canvasRef: Ref<HTMLCanvasElement | null>,
  options: CanvasOptions,
): CanvasState {
  const { positions, animate, visibleCount, onAnimationComplete } = options

  // Get arrow drawing utilities
  const { drawArrow, getArrowColor } = useArrowDrawing()

  const drawWordsOnCanvas = () => {
    if (!canvasRef.value) return

    const canvas = canvasRef.value
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas - use logical size (accounting for DPR)
    const displayWidth = canvas.width / (window.devicePixelRatio || 1)
    const displayHeight = canvas.height / (window.devicePixelRatio || 1)
    ctx.clearRect(0, 0, displayWidth, displayHeight)

    // Skip drawing if we don't have enough words
    if (positions.value.length <= 1) return

    // Determine how many elements to show based on animation state
    const currentVisibleCount = animate.value
      ? Math.min(visibleCount.value, positions.value.length)
      : positions.value.length

    // Map word positions to canvas coordinates
    const canvasPositions = positions.value.map(({ position }) => {
      // Map from range -100 to 100 to canvas coordinates
      return {
        x: ((position.x + 100) * displayWidth) / 200,
        y: ((position.y + 100) * displayHeight) / 200,
      }
    })

    // Draw arrows connecting words in their sequence order
    // Only draw arrows up to visibleCount-1 connections
    for (let i = 0; i < Math.min(currentVisibleCount - 1, canvasPositions.length - 1); i++) {
      const fromPos = canvasPositions[i]
      const toPos = canvasPositions[i + 1]

      // Get a color based on position in the sequence
      const color = getArrowColor(i, canvasPositions.length - 1)

      // Draw the arrow from current word to the next word in the sequence
      drawArrow(ctx, fromPos.x, fromPos.y, toPos.x, toPos.y, color, 1.5, 8, i + 1)
    }

    // Draw each word at its position with a background for better readability
    drawWords(ctx, positions.value.slice(0, currentVisibleCount), displayWidth, displayHeight)

    // Check if animation is complete
    if (animate.value && visibleCount.value === positions.value.length) {
      onAnimationComplete()
    }
  }

  // Helper function to draw words on the canvas
  const drawWords = (
    ctx: CanvasRenderingContext2D,
    words: WordPosition[],
    displayWidth: number,
    displayHeight: number,
  ) => {
    // Set text properties for words
    ctx.font = 'bold 16px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // Draw each word
    words.forEach(({ word, position }) => {
      // Map from range -100 to 100 to canvas coordinates
      const x = ((position.x + 100) * displayWidth) / 200
      const y = ((position.y + 100) * displayHeight) / 200

      // Text measurements for background
      const textWidth = ctx.measureText(word).width
      const padding = 6

      // Draw a white background for the text
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
      ctx.fillRect(
        x - textWidth / 2 - padding,
        y - 10 - padding / 2,
        textWidth + padding * 2,
        20 + padding,
      )

      // Draw text
      ctx.fillStyle = '#333'
      ctx.fillText(word, x, y)
    })
  }

  // Initial draw
  setTimeout(() => {
    drawWordsOnCanvas()
  }, 0)

  // Watch for changes to redraw the canvas
  watch(
    [positions, visibleCount, animate],
    () => {
      drawWordsOnCanvas()
    },
    { deep: true },
  )

  return {
    drawWordsOnCanvas,
  }
}
