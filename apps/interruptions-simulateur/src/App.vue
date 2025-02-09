<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import Card from './components/Card.vue'
import DailyCostInput from './components/DailyCostInput.vue'
import ExplanationSidebar from './components/ExplanationSidebar.vue'
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
import Title from './components/Title.vue'
import {
  DEFAULT_CONTEXT_SWITCH_MINUTES,
  DEFAULT_NON_BILLABLE_PERCENTAGE,
  DEFAULT_VACATION_DAYS,
  DEFAULT_WORK_DAYS,
} from './utils/constants'
import {
  calculateAnnualCost,
  calculateCostPerInterruption,
  determineShakeIntensity,
} from './utils/costCalculator'

const DEFAULT_DAILY_COST = 600
const MIN_DAILY_COST = 0
const MAX_DAILY_COST = 10000

const interruptions = ref(0)
const dailyCost = ref(DEFAULT_DAILY_COST)
const lastWeekReset = ref(0)
const prefersReducedMotion = ref(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
const isHelpOpen = ref(false)

// Work settings
const workDays = ref<number[]>(DEFAULT_WORK_DAYS)
const vacationDays = ref(DEFAULT_VACATION_DAYS)
const contextSwitchMinutes = ref(DEFAULT_CONTEXT_SWITCH_MINUTES)
const nonBillablePercentage = ref(DEFAULT_NON_BILLABLE_PERCENTAGE)

const addInterruption = () => {
  interruptions.value++
  saveToLocalStorage()
}

const resetCount = () => {
  interruptions.value = 0
  lastWeekReset.value = Date.now()
  saveToLocalStorage()
}

const validateDailyCost = (value: number): number => {
  if (isNaN(value) || value < MIN_DAILY_COST) return DEFAULT_DAILY_COST
  if (value > MAX_DAILY_COST) return MAX_DAILY_COST
  return value
}

const saveToLocalStorage = () => {
  const data = {
    interruptions: interruptions.value,
    dailyCost: dailyCost.value,
    lastWeekReset: lastWeekReset.value,
    workDays: workDays.value,
    vacationDays: vacationDays.value,
    contextSwitchMinutes: contextSwitchMinutes.value,
    nonBillablePercentage: nonBillablePercentage.value,
  }
  localStorage.setItem('settings', JSON.stringify(data))
}

const loadFromLocalStorage = () => {
  try {
    const data = JSON.parse(localStorage.getItem('settings') || '{}')

    // Load and validate interruptions
    interruptions.value =
      !isNaN(data.interruptions) && data.interruptions >= 0 ? data.interruptions : 0

    // Load and validate daily cost
    dailyCost.value = validateDailyCost(data.dailyCost)

    // Load and validate last week reset
    lastWeekReset.value =
      !isNaN(data.lastWeekReset) && data.lastWeekReset > 0
        ? Math.min(data.lastWeekReset, Date.now())
        : Date.now()

    // Load work settings
    workDays.value = Array.isArray(data.workDays) ? data.workDays : DEFAULT_WORK_DAYS
    vacationDays.value = !isNaN(data.vacationDays) ? data.vacationDays : DEFAULT_VACATION_DAYS
    contextSwitchMinutes.value = !isNaN(data.contextSwitchMinutes)
      ? data.contextSwitchMinutes
      : DEFAULT_CONTEXT_SWITCH_MINUTES
    nonBillablePercentage.value = !isNaN(data.nonBillablePercentage)
      ? data.nonBillablePercentage
      : DEFAULT_NON_BILLABLE_PERCENTAGE
  } catch (error) {
    console.error('Error loading from localStorage:', error)
    // Reset to defaults if there's an error
    interruptions.value = 0
    dailyCost.value = DEFAULT_DAILY_COST
    lastWeekReset.value = Date.now()
    workDays.value = DEFAULT_WORK_DAYS
    vacationDays.value = DEFAULT_VACATION_DAYS
    contextSwitchMinutes.value = DEFAULT_CONTEXT_SWITCH_MINUTES
    nonBillablePercentage.value = DEFAULT_NON_BILLABLE_PERCENTAGE
  }
}

const updateDailyCost = (value: number) => {
  dailyCost.value = validateDailyCost(value)
  saveToLocalStorage()
}

const updateWorkDays = (days: number[]) => {
  workDays.value = days
  saveToLocalStorage()
}

const updateVacationDays = (days: number) => {
  vacationDays.value = days
  saveToLocalStorage()
}

const updateContextSwitch = (minutes: number) => {
  contextSwitchMinutes.value = minutes
  saveToLocalStorage()
}

const updateNonBillable = (percentage: number) => {
  nonBillablePercentage.value = percentage
  saveToLocalStorage()
}

const timeElapsedMs = computed(() => {
  return Date.now() - lastWeekReset.value
})

const costPerInterruption = computed(() => {
  return calculateCostPerInterruption({
    dailyCost: dailyCost.value,
    contextSwitchMinutes: contextSwitchMinutes.value,
    nonBillablePercentage: nonBillablePercentage.value,
  })
})

const annualCost = computed(() => {
  const cost = calculateAnnualCost({
    dailyCost: dailyCost.value,
    interruptions: interruptions.value,
    timeElapsedMs: timeElapsedMs.value,
    workDays: workDays.value,
    vacationDays: vacationDays.value,
    contextSwitchMinutes: contextSwitchMinutes.value,
    nonBillablePercentage: nonBillablePercentage.value,
  })
  return cost.toFixed(2)
})

const shakeIntensity = computed(() => {
  return determineShakeIntensity(parseFloat(annualCost.value))
})

onMounted(() => {
  loadFromLocalStorage()
})
</script>

<template>
  <div class="app-wrapper">
    <Header />
    <div class="container">
      <Title :prefersReducedMotion="prefersReducedMotion" />
      
      <DailyCostInput
        :modelValue="dailyCost"
        :onUpdate="updateDailyCost"
      />

      <Transition 
        :duration="prefersReducedMotion ? 0 : 500"
        appear
        name="fade-up"
      >
        <Card
          title="Interruptions cette semaine"
          :mainValue="interruptions"
          :subValue="`${costPerInterruption.toFixed(2)}€ par interruption`"
          buttonText="Ajouter une interruption"
          :buttonAction="addInterruption"
        />
      </Transition>

      <Transition 
        :duration="prefersReducedMotion ? 0 : 500"
        appear
        name="fade-up"
      >
        <Card
          title="Estimation annuelle"
          :mainValue="`${annualCost}€ / an`"
          buttonText="Réinitialiser le compteur"
          :buttonAction="resetCount"
          :shakeIntensity="shakeIntensity"
          :showHelp="true"
          @openHelp="isHelpOpen = true"
        />
      </Transition>

      <Footer :prefersReducedMotion="prefersReducedMotion" />
    </div>
  </div>

  <Teleport to="body">
    <ExplanationSidebar 
      :isOpen="isHelpOpen"
      :onClose="() => isHelpOpen = false"
      :workDays="workDays"
      :vacationDays="vacationDays"
      :contextSwitchMinutes="contextSwitchMinutes"
      :nonBillablePercentage="nonBillablePercentage"
      :onUpdateWorkDays="updateWorkDays"
      :onUpdateVacationDays="updateVacationDays"
      :onUpdateContextSwitch="updateContextSwitch"
      :onUpdateNonBillable="updateNonBillable"
    />
  </Teleport>
</template>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  flex: 1;
  margin: 0 auto;
  padding: 2rem;
  max-width: 800px;
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.5s ease;
}

.fade-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.fade-up-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

@media (prefers-reduced-motion: reduce) {
  .fade-up-enter-active,
  .fade-up-leave-active {
    transition: none;
  }

  .fade-up-enter-from,
  .fade-up-leave-to {
    transform: none;
  }
}
</style>