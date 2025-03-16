import { type Ref, onBeforeUnmount, onMounted } from 'vue'

export interface CanvasSetup {
  resizeCanvas: () => void
}

export function useCanvasSetup(
  canvasRef: Ref<HTMLCanvasElement | null>,
  containerRef: Ref<HTMLDivElement | null>,
  drawFunction: () => void,
): CanvasSetup {
  const resizeCanvas = () => {
    if (!canvasRef.value || !containerRef.value) return

    const canvas = canvasRef.value
    const container = containerRef.value

    // Get the display size of the container
    const rect = container.getBoundingClientRect()

    // Get device pixel ratio
    const dpr = window.devicePixelRatio || 1

    // Set the canvas size in actual pixels
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    // Scale all drawing operations by the dpr
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.scale(dpr, dpr)
    }

    // CSS size remains the same
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    // Redraw after resize
    drawFunction()
  }

  onMounted(() => {
    window.addEventListener('resize', resizeCanvas)
    // Use timeout to ensure the container has been rendered
    setTimeout(resizeCanvas, 0)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeCanvas)
  })

  return {
    resizeCanvas,
  }
}
