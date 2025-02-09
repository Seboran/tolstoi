<script setup lang="ts">
import { HelpCircle } from 'lucide-vue-next'
import { ref } from 'vue'

interface Props {
  title: string
  mainValue?: string | number
  subValue?: string
  buttonText?: string
  buttonAction?: () => void
  shakeIntensity?: '' | 'shake-light' | 'shake-medium' | 'shake-heavy'
  showHelp?: boolean
}

withDefaults(defineProps<Props>(), {
  showHelp: false,
})

const emit = defineEmits<{
  (e: 'openHelp'): void
}>()

const showTooltip = ref(false)
let tooltipTimeout: number | null = null

const handleMouseEnter = () => {
  if (tooltipTimeout) {
    clearTimeout(tooltipTimeout)
    tooltipTimeout = null
  }
  showTooltip.value = true
}

const handleMouseLeave = () => {
  tooltipTimeout = window.setTimeout(() => {
    showTooltip.value = false
  }, 300)
}
</script>

<template>
  <div class="stat-card">
    <div class="card-header">
      <h2>{{ title }}</h2>
      <div v-if="showHelp" class="help-wrapper">
        <div 
          class="help-button-wrapper"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
        >
          <button 
            class="help-button"
            @click="emit('openHelp')"
            aria-label="Voir l'explication du calcul"
          >
            <HelpCircle />
          </button>
          <div 
            class="tooltip"
            :class="{ visible: showTooltip }"
            role="tooltip"
          >
            Comment cette estimation est faite ?
          </div>
        </div>
      </div>
    </div>
    <div class="card-content">
      <p v-if="subValue" class="sub-value">{{ subValue }}</p>
      <p 
        class="cost-display" 
        :class="[
          { 'vaporwave': shakeIntensity },
          { 'vaporwave-medium': shakeIntensity === 'shake-medium' },
          { 'vaporwave-heavy': shakeIntensity === 'shake-heavy' },
          shakeIntensity
        ]"
      >
        {{ mainValue }}
      </p>
      <button v-if="buttonText && buttonAction" @click="buttonAction">
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.stat-card {
  background: linear-gradient(135deg, #f6d5f7 0%, #fbe9d7 100%);
  padding: 1.5rem;
  border-radius: 15px;
  margin: 1rem 0;
  text-align: center;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.help-wrapper {
  position: relative;
}

.help-button-wrapper {
  position: relative;
  padding: 8px;
  margin: -8px;
}

.help-button {
  background: none;
  border: none;
  padding: 0;
  color: #764ba2;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.help-button:hover {
  opacity: 1;
}

.tooltip {
  position: absolute;
  visibility: hidden;
  opacity: 0;
  background: white;
  color: #2c3e50;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  z-index: 10;
  left: 50%;
  transform: translateX(-50%);
  bottom: calc(100% + 5px);
  transition: opacity 0.3s ease, visibility 0s linear 0.3s;
  pointer-events: none;
}

.tooltip.visible {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.3s ease, visibility 0s linear 0s;
}

.tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 5px;
  border-style: solid;
  border-color: white transparent transparent transparent;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

h2 {
  font-size: 2em;
  color: #2c3e50;
  margin: 0;
}

.sub-value {
  margin: 0;
}

.cost-display {
  font-size: 2em;
  font-weight: 600;
  margin: 0;
  position: relative;
  color: #764ba2;
  transition: all 0.3s ease;
}

button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.8em 1.5em;
  font-size: 1.1em;
  font-family: 'Playfair Display', serif;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;
}

button:hover {
  transform: translateY(-2px);
}

@media (prefers-reduced-motion: reduce) {
  .tooltip {
    transition: none;
  }
}
</style>