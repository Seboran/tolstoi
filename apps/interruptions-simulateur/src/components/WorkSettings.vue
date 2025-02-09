<script setup lang="ts">
interface Props {
  workDays: number[]
  vacationDays: number
  contextSwitchMinutes: number
  nonBillablePercentage: number
  onUpdateWorkDays: (days: number[]) => void
  onUpdateVacationDays: (days: number) => void
  onUpdateContextSwitch: (minutes: number) => void
  onUpdateNonBillable: (percentage: number) => void
}

const props = defineProps<Props>()

const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

const toggleWorkDay = (index: number) => {
  const newWorkDays = [...props.workDays]
  if (newWorkDays.includes(index)) {
    newWorkDays.splice(newWorkDays.indexOf(index), 1)
  } else {
    newWorkDays.push(index)
  }
  props.onUpdateWorkDays(newWorkDays)
}
</script>

<template>
  <div class="work-settings">
    <div class="setting-section">
      <h3 class="section-title">Mes jours ouvrés</h3>
      <div class="days-grid">
        <button
          v-for="(day, index) in daysOfWeek"
          :key="index"
          class="day-button"
          :class="{ active: workDays.includes(index) }"
          @click="toggleWorkDay(index)"
        >
          {{ day }}
        </button>
      </div>
    </div>

    <div class="setting-section">
      <h3 class="section-title">Jours de vacances par an</h3>
      <div class="spinbutton-wrapper">
        <input
          type="number"
          :value="vacationDays"
          @input="e => onUpdateVacationDays(Math.min(60, Math.max(0, parseInt((e.target as HTMLInputElement).value) || 0)))"
          min="0"
          max="60"
          step="1"
          class="spinbutton"
        />
        <span class="unit">jours</span>
      </div>
    </div>

    <div class="setting-section">
      <h3 class="section-title">Temps de changement de contexte</h3>
      <div class="spinbutton-wrapper">
        <input
          type="number"
          :value="contextSwitchMinutes"
          @input="e => onUpdateContextSwitch(Math.min(30, Math.max(5, parseInt((e.target as HTMLInputElement).value) || 5)))"
          min="5"
          max="30"
          step="1"
          class="spinbutton"
        />
        <span class="unit">minutes</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.work-settings {
  background: white;
  border-radius: 12px;
  margin: 0.75rem 0;
}

.setting-section {
  margin: 1rem 0;
  padding: 0.5rem;
  position: relative;
  max-width: 20rem;
}

.setting-section:first-child {
  margin-top: 0;
}

.section-title {
  color: #1e293b;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
  max-width: 280px;
  margin: 0 auto;
}

.day-button {
  width: 32px;
  height: 32px;
  background: #f0f7ff;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1e40af;
  padding: 0;
}

.day-button.active {
  background: #1e40af;
  color: white;
}

.spinbutton-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  max-width: 280px;
  margin: 0 auto;
}

.spinbutton {
  width: 80px;
  padding: 0.5rem;
  border: 2px solid #bfdbfe;
  border-radius: 8px;
  font-family: inherit;
  font-size: 0.9rem;
  color: #1e3a8a;
  background: #f0f7ff;
  text-align: center;
  transition: all 0.2s ease;
}

.spinbutton:focus {
  outline: none;
  border-color: #1e40af;
  box-shadow: 0 0 0 2px #bfdbfe;
}

.spinbutton::-webkit-inner-spin-button,
.spinbutton::-webkit-outer-spin-button {
  opacity: 1;
  background: #1e40af;
  border-radius: 4px;
  height: 1.75rem;
  margin-right: 0.25rem;
  cursor: pointer;
}

.unit {
  color: #1e3a8a;
  font-size: 0.9rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .days-grid {
    max-width: 240px;
  }

  .day-button {
    width: 28px;
    height: 28px;
    font-size: 0.8rem;
  }
}
</style>