import { ArrowDown, ArrowUp, X } from 'lucide-react'
import React, { useState } from 'react'
import type { Profession } from '../types'
import { calculateDailyRate } from '../utils/calculator'
import { Sidebar } from './Sidebar'
import { FreedomSection } from './calculator/FreedomSection'
import { GetStartedSection } from './calculator/GetStartedSection'
import { ThresholdWarning } from './calculator/ThresholdWarning'
import Link from 'next/link'

type CalculatorProps = {
  profession: Profession
  annualSalary: number
  daysPerWeek: number
  vacationDays: number
  monthlyExpenses: number
  onAnnualSalaryChange: (value: number) => void
  onDaysPerWeekChange: (value: number) => void
  onVacationDaysChange: (value: number) => void
  onMonthlyExpensesChange: (value: number) => void
}

export function Calculator({
  profession,
  annualSalary,
  daysPerWeek,
  vacationDays,
  monthlyExpenses,
  onAnnualSalaryChange,
  onDaysPerWeekChange,
  onVacationDaysChange,
  onMonthlyExpensesChange,
}: CalculatorProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [nonBillableTime, setNonBillableTime] = useState(25)
  const [isAcreEligible, setIsAcreEligible] = useState(false)

  const { dailyRate, netDaily, effectiveWorkingDays, potentialAnnualRevenue, isOverThreshold } =
    calculateDailyRate({
      annualSalary,
      daysPerWeek,
      vacationDays,
      monthlyExpenses,
      nonBillableTime,
      isAcreEligible,
    })

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 pt-20">
        <div className="text-center mb-12">
          <h1 className="text-2xl text-gray-600 mb-2">
            Simulateur de revenus <span className="text-blue-600">freelancing</span> vs{' '}
            <span className="text-blue-600">salariat</span>
          </h1>
          <h2 className="text-4xl font-bold text-gray-900">
            Combien facturer en tant que {profession.title} ?
          </h2>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Salaire brut annuel en CDI souhaité
            </h3>

            <div className="mb-8">
              <div className="text-4xl font-bold text-center p-4 bg-blue-100 rounded-lg text-blue-900 mb-4">
                {annualSalary.toLocaleString('fr-FR')} €
              </div>

              <input
                type="range"
                min="20000"
                max="75000"
                step="500"
                value={annualSalary}
                onChange={(e) => onAnnualSalaryChange(Number(e.target.value))}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="flex justify-center space-x-2 mb-8">
              <ArrowUp className="w-6 h-6 text-blue-600" />
              <ArrowDown className="w-6 h-6 text-blue-600" />
            </div>

            <div className="text-center">
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                Taux journalier moyen à facturer
              </h4>
              <div className="text-4xl font-bold text-white bg-pink-500 rounded-lg p-4 mb-4">
                {dailyRate} €
              </div>

              <ThresholdWarning
                isOverThreshold={isOverThreshold}
                effectiveWorkingDays={effectiveWorkingDays}
                dailyRate={dailyRate}
                potentialAnnualRevenue={potentialAnnualRevenue}
              />

              <div className="text-gray-600">
                <p className="mb-2">
                  Il vous restera
                  <span className="text-lg font-bold text-white bg-gray-500 rounded-lg p-2 m-4">
                    {netDaily} €
                  </span>
                </p>
                <p className="text-sm">
                  Après déduction des charges
                  <br />
                  et cotisations sociales
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsSidebarOpen(true)}
              className="w-full mt-6 text-blue-600 hover:text-blue-700 font-medium"
            >
              Voir et modifier les paramètres
            </button>
          </div>

          <div className="space-y-8">
            <FreedomSection
              annualSalary={annualSalary}
              dailyRate={dailyRate}
              effectiveWorkingDays={effectiveWorkingDays}
              vacationDays={vacationDays}
              nonBillableTime={nonBillableTime}
              isAcreEligible={isAcreEligible}
            />

            <GetStartedSection />
          </div>
        </div>
      </div>

      <Link href="/">
        <button className="fixed top-4 right-4 p-2 text-gray-500 hover:text-gray-700 bg-white rounded-full shadow-lg hover:shadow-xl transition-all">
          <X className="w-6 h-6" />
        </button>
      </Link>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        daysPerWeek={daysPerWeek}
        vacationDays={vacationDays}
        monthlyExpenses={monthlyExpenses}
        onDaysPerWeekChange={onDaysPerWeekChange}
        onVacationDaysChange={onVacationDaysChange}
        onMonthlyExpensesChange={onMonthlyExpensesChange}
        nonBillableTime={nonBillableTime}
        onNonBillableTimeChange={setNonBillableTime}
        isAcreEligible={isAcreEligible}
        onAcreEligibleChange={setIsAcreEligible}
      />
    </div>
  )
}
