<script lang="ts" setup>
import { computed, defineEmits, defineProps, ref, watch } from 'vue'
import { useCanvasRendering } from '../../composables/useCanvasRendering'
import { useCanvasSetup } from '../../composables/useCanvasSetup'
import type { WordPosition } from './useWordToPosition'

const props = defineProps<{
  positions: WordPosition[]
  visibleCount?: number
  animate: boolean
}>()

const emit = defineEmits(['animationComplete'])

// References to DOM elements
const canvasRef = ref<HTMLCanvasElement | null>(null)
const containerRef = ref<HTMLDivElement | null>(null)

// Create computed refs for the reactive props
const positionsRef = computed(() => props.positions)
const animateRef = computed(() => props.animate)
const visibleCountRef = computed(() => props.visibleCount ?? props.positions.length)

// Initialize canvas rendering
const { drawWordsOnCanvas } = useCanvasRendering(canvasRef, {
  positions: positionsRef,
  animate: animateRef,
  visibleCount: visibleCountRef,
  onAnimationComplete: () => emit('animationComplete'),
})

// Setup canvas with resize handling
const { resizeCanvas } = useCanvasSetup(canvasRef, containerRef, drawWordsOnCanvas)

// Watch for changes to redraw canvas
watch(
  [() => props.positions, () => props.visibleCount, () => props.animate],
  () => {
    drawWordsOnCanvas()

    // Emit completion event when animation is done
    if (props.animate && props.visibleCount === props.positions.length) {
      emit('animationComplete')
    }
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
