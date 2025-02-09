// Constants
export const WEEKS_PER_YEAR = 52
export const PUBLIC_HOLIDAYS = 11
export const BASE_CHARGES_PERCENTAGE = 0.25
export const ACRE_CHARGES_REDUCTION = 0.5 // 50% reduction in charges for ACRE eligible
export const MARGIN_FACTOR = 1.2
export const REVENUE_THRESHOLD = 75000

type CalculationParams = {
  annualSalary: number
  daysPerWeek: number
  vacationDays: number
  monthlyExpenses: number
  nonBillableTime: number
  isAcreEligible: boolean
}

type CalculationResult = {
  dailyRate: number
  netDaily: number
  effectiveWorkingDays: number
  potentialAnnualRevenue: number
  isOverThreshold: boolean
}

export function calculateDailyRate({
  annualSalary,
  daysPerWeek,
  vacationDays,
  monthlyExpenses,
  nonBillableTime,
  isAcreEligible,
}: CalculationParams): CalculationResult {
  // Calculate effective working days considering non-billable time
  const workingDaysPerYear = WEEKS_PER_YEAR * daysPerWeek - vacationDays - PUBLIC_HOLIDAYS
  const effectiveWorkingDays = workingDaysPerYear * (1 - nonBillableTime / 100)

  // Calculate annual expenses and required income
  const annualExpenses = monthlyExpenses * 12
  const totalRequired = annualSalary + annualExpenses

  // Calculate daily rate considering all parameters
  const baseDaily = totalRequired / effectiveWorkingDays
  const chargesPercentage = isAcreEligible
    ? BASE_CHARGES_PERCENTAGE * (1 - ACRE_CHARGES_REDUCTION)
    : BASE_CHARGES_PERCENTAGE
  const withCharges = baseDaily / (1 - chargesPercentage)
  const dailyRate = Math.round(withCharges * MARGIN_FACTOR)
  const netDaily = Math.round(dailyRate * (1 - chargesPercentage))

  // Calculate potential annual revenue and threshold status
  const potentialAnnualRevenue = dailyRate * effectiveWorkingDays
  const isOverThreshold = potentialAnnualRevenue > REVENUE_THRESHOLD

  return {
    dailyRate,
    netDaily,
    effectiveWorkingDays,
    potentialAnnualRevenue,
    isOverThreshold,
  }
}
