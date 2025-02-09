<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  modelValue: number
  onUpdate: (value: number) => void
}

const props = defineProps<Props>()

const tooltipVisible = ref(false)
let tooltipTimeout: number | null = null

const showTooltip = () => {
  if (tooltipTimeout) {
    clearTimeout(tooltipTimeout)
    tooltipTimeout = null
  }
  tooltipVisible.value = true
}

const hideTooltip = () => {
  tooltipTimeout = window.setTimeout(() => {
    tooltipVisible.value = false
  }, 300)
}

const updateDailyCost = (event: Event) => {
  const input = event.target as HTMLInputElement
  props.onUpdate(parseFloat(input.value))
}
</script>

<template>
  <div class="form-group">
    <div class="label-group">
      <label>Coût journalier (€)</label>
      <div 
        class="tooltip-wrapper"
        @mouseenter="showTooltip"
        @mouseleave="hideTooltip"
      >
        <span class="tooltip-trigger" role="button" tabindex="0" aria-label="Aide pour le calcul du taux journalier">?</span>
        <div class="tooltip-content" :class="{ visible: tooltipVisible }" role="tooltip">
          Comment calculer votre taux journalier ?
          <a 
            href="https://freelance-simulateur.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Utilisez ce simulateur
          </a>
        </div>
      </div>
    </div>
    <div class="input-wrapper">
      <input 
        type="number" 
        :value="modelValue"
        @input="updateDailyCost"
        placeholder="Votre taux journalier"
        aria-label="Votre taux journalier en euros"
      />
    </div>
  </div>
</template>

<style scoped>
.form-group {
  margin: 1rem auto;
  max-width: 400px;
}

.input-wrapper {
  margin: 0.5rem auto;
  max-width: 300px;
}

input {
  width: 100%;
  padding: 1em;
  margin: 0.5em 0;
  border: 3px solid #764ba2;
  border-radius: 12px;
  font-family: 'Playfair Display', serif;
  font-size: 1.2em;
  text-align: center;
  background: linear-gradient(to right bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.6));
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 6px 12px rgba(102, 126, 234, 0.2);
  transform: translateY(-2px);
}

.label-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
}

.tooltip-wrapper {
  position: relative;
  padding: 8px;
  margin: -8px;
}

.tooltip-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  cursor: help;
  font-size: 0.9em;
}

.tooltip-trigger:focus {
  outline: 2px solid #764ba2;
  outline-offset: 2px;
}

.tooltip-content {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  z-index: 1;
  width: 200px;
  background: white;
  color: #2c3e50;
  text-align: center;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  left: 50%;
  transform: translateX(-50%);
  bottom: 125%;
  transition: opacity 0.3s, visibility 0s;
}

.tooltip-content.visible {
  visibility: visible;
  opacity: 1;
}

.tooltip-content a {
  color: #764ba2;
  text-decoration: none;
  font-weight: 600;
  display: block;
  margin-top: 0.5rem;
  padding: 0.5rem;
}

.tooltip-content a:hover {
  text-decoration: underline;
}

@media (prefers-reduced-motion: reduce) {
  .tooltip-content {
    transition: none;
  }
}
</style>