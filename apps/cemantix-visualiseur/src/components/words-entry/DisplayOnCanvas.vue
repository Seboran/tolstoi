<script lang="ts" setup>
import { defineProps, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { WordPosition } from './useWordToPosition'

const props = defineProps<{ positions: WordPosition[] }>()
const canvasRef = ref<HTMLCanvasElement | null>(null)
const containerRef = ref<HTMLDivElement | null>(null)

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
  drawWordsOnCanvas()
}

const drawWordsOnCanvas = () => {
  if (!canvasRef.value) return

  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // Clear canvas - use logical size (accounting for DPR)
  const displayWidth = canvas.width / (window.devicePixelRatio || 1)
  const displayHeight = canvas.height / (window.devicePixelRatio || 1)
  ctx.clearRect(0, 0, displayWidth, displayHeight)

  // Set text properties
  ctx.font = '16px Arial'
  ctx.fillStyle = '#333'
  ctx.textAlign = 'center'

  // Draw each word at its position
  props.positions.forEach(({ word, position }) => {
    // Map from range -100 to 100 to canvas coordinates
    const x = ((position.x + 100) * displayWidth) / 200
    const y = ((position.y + 100) * displayHeight) / 200
    ctx.fillText(word, x, y)
  })
}

onMounted(() => {
  window.addEventListener('resize', resizeCanvas)
  // Use timeout to ensure the container has been rendered
  setTimeout(resizeCanvas, 0)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCanvas)
})

// Redraw when positions change
watch(
  () => props.positions,
  () => {
    drawWordsOnCanvas()
  },
  { deep: true },
)
</script>

<template>
  <div ref="containerRef" class="canvas-container">
    <canvas ref="canvasRef" class="words-canvas"></canvas>
  </div>
</template>

<style scoped>
.canvas-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.words-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
