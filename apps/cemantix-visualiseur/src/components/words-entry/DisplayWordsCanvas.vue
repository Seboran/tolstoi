<script setup lang="ts">
import { ref, toRef } from 'vue'
import DisplayOnCanvas from './DisplayOnCanvas.vue'
import { useWordToPosition } from './useWordToPosition'

const props = defineProps<{ words: string[]; animate?: boolean }>()
const { positions } = useWordToPosition(toRef(() => props.words))

// Animation state
const isAnimating = ref(false)
const visibleCount = ref(0)
const animationSpeed = 600 // milliseconds per word

// Emit animation completed event for parent components
const emit = defineEmits(['animationComplete'])

// Function to handle animation completion
const onAnimationComplete = () => {
  isAnimating.value = false
  emit('animationComplete')
}

// Function to start the sequential animation
const startSequentialAnimation = () => {
  // Reset animation state
  visibleCount.value = 0
  isAnimating.value = true

  // Function to increment the visible count with a delay
  const animateNextWord = () => {
    if (visibleCount.value < positions.value.length) {
      visibleCount.value++

      // Continue animation if there are more words
      if (visibleCount.value < positions.value.length) {
        setTimeout(animateNextWord, animationSpeed)
      }
    }
  }

  // Start the animation sequence
  animateNextWord()
}

// Expose the animation function to parent components
defineExpose({
  startSequentialAnimation,
})
</script>

<template>
  <DisplayOnCanvas 
    :positions="positions" 
    :animate="isAnimating"
    :visible-count="visibleCount"
    @animation-complete="onAnimationComplete"
  />
</template>
