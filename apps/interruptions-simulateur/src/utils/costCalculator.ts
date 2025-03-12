import { HOURS_PER_DAY, MINUTES_PER_HOUR } from './constants'
import type { CostParams } from './types'

function calculateWorkingWeeks(vacationDays: number): number {
  const totalWeeks = 52
  const vacationWeeks = Math.ceil(vacationDays / 5)
  return totalWeeks - vacationWeeks
}

function calculateEffectiveRate(dailyCost: number, nonBillablePercentage: number): number {
  return dailyCost * (1 - nonBillablePercentage / 100)
}

export function calculateCostPerInterruption(
  params: Pick<CostParams, 'dailyCost' | 'contextSwitchMinutes' | 'nonBillablePercentage'>,
): number {
  const effectiveRate = calculateEffectiveRate(params.dailyCost, params.nonBillablePercentage)
  const hourlyRate = effectiveRate / HOURS_PER_DAY
  const minuteRate = hourlyRate / MINUTES_PER_HOUR
  return minuteRate * params.contextSwitchMinutes
}

export function calculateAnnualCost(params: CostParams): number {
  const weeklyInterruptions = params.interruptions
  const workingWeeks = calculateWorkingWeeks(params.vacationDays)
  const costPerInterruption = calculateCostPerInterruption({
    dailyCost: params.dailyCost,
    contextSwitchMinutes: params.contextSwitchMinutes,
    nonBillablePercentage: params.nonBillablePercentage,
  })

  // Adjust for working days (e.g., if only working 4 days instead of 5)
  const daysAdjustment = params.workDays.length / 5

  return weeklyInterruptions * workingWeeks * costPerInterruption * daysAdjustment
}

export function determineShakeIntensity(
  annualCost: number,
): '' | 'shake-light' | 'shake-medium' | 'shake-heavy' {
  if (annualCost < 1000) return ''
  if (annualCost < 5000) return 'shake-light'
  if (annualCost < 10000) return 'shake-medium'
  return 'shake-heavy'
}
