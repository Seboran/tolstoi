export interface CostParams {
  dailyCost: number
  interruptions: number
  timeElapsedMs: number
  workDays: number[]
  vacationDays: number
  contextSwitchMinutes: number
  nonBillablePercentage: number
}

export interface WorkSettings {
  workDays: number[]
  vacationDays: number
  contextSwitchMinutes: number
  nonBillablePercentage: number
}
