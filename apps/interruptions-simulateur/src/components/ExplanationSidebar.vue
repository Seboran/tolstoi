<script setup lang="ts">
import { X } from 'lucide-vue-next'
import WorkSettings from './WorkSettings.vue'

defineProps<{
  isOpen: boolean
  onClose: () => void
  workDays: number[]
  vacationDays: number
  contextSwitchMinutes: number
  nonBillablePercentage: number
  onUpdateWorkDays: (days: number[]) => void
  onUpdateVacationDays: (days: number) => void
  onUpdateContextSwitch: (minutes: number) => void
  onUpdateNonBillable: (percentage: number) => void
}>()
</script>

<template>
  <div 
    class="sidebar-overlay"
    :class="{ 'is-open': isOpen }"
    @click="onClose"
  >
    <div 
      class="sidebar"
      :class="{ 'is-open': isOpen }"
      @click.stop
    >
      <button class="close-button" @click="onClose" aria-label="Fermer">
        <X />
      </button>

      <div class="content">
        <h2>Paramètres et explications</h2>
        
        <WorkSettings
          :workDays="workDays"
          :vacationDays="vacationDays"
          :contextSwitchMinutes="contextSwitchMinutes"
          :nonBillablePercentage="nonBillablePercentage"
          :onUpdateWorkDays="onUpdateWorkDays"
          :onUpdateVacationDays="onUpdateVacationDays"
          :onUpdateContextSwitch="onUpdateContextSwitch"
          :onUpdateNonBillable="onUpdateNonBillable"
        />

        <div class="explanation">
          <h3>Comment l'estimation est-elle calculée ?</h3>
          
          <div class="explanation-grid">
            <div class="explanation-item">
              <h4>Coût par interruption</h4>
              <p>Chaque interruption coûte du temps de travail basé sur le temps de changement de contexte choisi, calculé proportionnellement à votre taux journalier.</p>
            </div>

            <div class="explanation-item">
              <h4>Moyenne hebdomadaire</h4>
              <p>Nombre total d'interruptions divisé par le nombre de semaines écoulées depuis la dernière réinitialisation.</p>
            </div>

            <div class="explanation-item">
              <h4>Coût annuel</h4>
              <p>Basé sur votre moyenne hebdomadaire d'interruptions, ajusté selon vos jours travaillés et vos congés.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease;
}

.sidebar-overlay.is-open {
  opacity: 1;
  visibility: visible;
}

.sidebar {
  position: fixed;
  top: 0;
  right: -50%;
  width: 50%;
  height: 100%;
  background: white;
  overflow-y: auto;
  transition: right 0.3s ease;
  z-index: 101;
}

.sidebar.is-open {
  right: 0;
}

.content {
  padding: 1.5rem 1.5rem 2rem 1.5rem;
  min-height: 100%;
  position: relative;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
}

.close-button {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #2c3e50;
  transition: color 0.2s ease;
  z-index: 2;
}

.close-button:hover {
  color: #764ba2;
}

h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.5em;
  padding-right: 2rem;
}

h3 {
  color: #764ba2;
  margin: 1rem 0 0.75rem;
  font-size: 1.2em;
}

h4 {
  color: #2c3e50;
  margin-bottom: 0.25rem;
  font-size: 1em;
  font-weight: 600;
}

.explanation {
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid #eee;
}

.explanation-grid {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.explanation-item {
  background: #f8f9fa;
  padding: 0.75rem;
  border-radius: 6px;
}

.explanation-item p {
  font-size: 0.85em;
  color: #666;
  margin: 0;
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    right: -100%;
  }

  .explanation-grid {
    grid-template-columns: 1fr;
  }

  .content {
    padding: 1.25rem 1rem 2rem 1rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sidebar-overlay,
  .sidebar {
    transition: none;
  }
}
</style>