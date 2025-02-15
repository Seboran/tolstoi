// Constants
const WEEKS_PER_YEAR = 52
const PUBLIC_HOLIDAYS = 0
const BASE_CHARGES_PERCENTAGE = 0.25 // Cotisations sociales ~22% pour prestations de service
const ACRE_CHARGES_REDUCTION = 0.5 // 50% réduction ACRE
const MARGIN_FACTOR = 1.1
export const MICRO_THRESHOLD = 77700 // Seuil micro-entreprise 2024

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
  // Jours ouvrés réels
  const workingDaysPerYear = WEEKS_PER_YEAR * daysPerWeek - vacationDays - PUBLIC_HOLIDAYS
  const effectiveWorkingDays = workingDaysPerYear * (1 - nonBillableTime / 100)

  // Dépenses annuelles et revenu cible
  const annualExpenses = monthlyExpenses * 12
  const totalRequired = annualSalary + annualExpenses

  // Calcul du TJM brut avant charges
  const baseDaily = totalRequired / effectiveWorkingDays
  const chargesPercentage = isAcreEligible
    ? BASE_CHARGES_PERCENTAGE * (1 - ACRE_CHARGES_REDUCTION)
    : BASE_CHARGES_PERCENTAGE
  const withCharges = baseDaily / (1 - chargesPercentage)
  const dailyRate = Math.round(withCharges * MARGIN_FACTOR)
  const netDaily = Math.round(dailyRate * (1 - chargesPercentage))

  // Revenu potentiel annuel
  const potentialAnnualRevenue = dailyRate * effectiveWorkingDays

  // Vérification des seuils
  const isOverThreshold = potentialAnnualRevenue > MICRO_THRESHOLD

  return {
    dailyRate,
    netDaily,
    effectiveWorkingDays,
    potentialAnnualRevenue,
    isOverThreshold,
  }
}
