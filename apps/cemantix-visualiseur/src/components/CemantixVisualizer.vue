<script setup lang="ts">
import { ref } from 'vue'
import { listeMotsInitiale } from './listeMots'
// @ts-ignore
import DisplayWordsCanvas from './words-entry/DisplayWordsCanvas.vue'
import ListWordsTextArea from './words-entry/ListWordsTextArea.vue'

const words = ref<string[]>(listeMotsInitiale)
const canvasRef = ref<any | null>(null)
const isAnimating = ref(false)

// Function to start the sequential animation
const startAnimation = () => {
  if (canvasRef.value && !isAnimating.value) {
    isAnimating.value = true
    canvasRef.value.startSequentialAnimation()
  }
}

// Reset animation state when complete
const onAnimationComplete = () => {
  isAnimating.value = false
}
</script>

<template>
  <div class="relative h-full w-full">
    <ListWordsTextArea v-model="words" />
    <div class="animation-controls absolute top-4 right-4 z-10">
      <button 
        @click="startAnimation" 
        class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-colors duration-300 flex items-center"
        :disabled="isAnimating"
      >
        <svg v-if="isAnimating" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>{{ isAnimating ? 'Animating...' : 'Animate Sequence' }}</span>
      </button>
    </div>
    <DisplayWordsCanvas 
      ref="canvasRef"
      :words="words"
      @animation-complete="onAnimationComplete"
    />
  </div>
</template>

<style scoped>
.animation-controls button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
