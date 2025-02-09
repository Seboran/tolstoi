import { X } from 'lucide-react'
import React, { useState } from 'react'
import { ContributionsSection } from './sidebar/ContributionsSection'
import { ExpensesSection } from './sidebar/ExpensesSection'
import { NonBillableSection } from './sidebar/NonBillableSection'
import { VacationSection } from './sidebar/VacationSection'
import { WorkingDaysSection } from './sidebar/WorkingDaysSection'

type SidebarProps = {
  isOpen: boolean
  onClose: () => void
  daysPerWeek: number
  vacationDays: number
  monthlyExpenses: number
  nonBillableTime: number
  isAcreEligible: boolean
  onDaysPerWeekChange: (value: number) => void
  onVacationDaysChange: (value: number) => void
  onMonthlyExpensesChange: (value: number) => void
  onNonBillableTimeChange: (value: number) => void
  onAcreEligibleChange: (value: boolean) => void
}

export function Sidebar({
  isOpen,
  onClose,
  vacationDays,
  monthlyExpenses,
  nonBillableTime,
  isAcreEligible,
  onDaysPerWeekChange,
  onVacationDaysChange,
  onMonthlyExpensesChange,
  onNonBillableTimeChange,
  onAcreEligibleChange,
}: SidebarProps) {
  const [selectedDays, setSelectedDays] = useState<boolean[]>([
    true,
    true,
    true,
    true,
    true,
    false,
    false,
  ])

  const handleDayToggle = (index: number) => {
    const newSelectedDays = [...selectedDays]
    newSelectedDays[index] = !newSelectedDays[index]
    setSelectedDays(newSelectedDays)
    onDaysPerWeekChange(newSelectedDays.filter(Boolean).length)
  }

  return (
    <div
      className={`fixed inset-y-0 right-0  md:w-[50vw] w-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="h-full overflow-y-auto p-8 md:max-w-[30rem]">
        <div className="flex justify-end items-center mb-8">
          <h2 className="sr-only text-2xl font-bold text-gray-900">Paramètres</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-12">
          <WorkingDaysSection selectedDays={selectedDays} onDayToggle={handleDayToggle} />

          <VacationSection
            vacationDays={vacationDays}
            onVacationDaysChange={onVacationDaysChange}
          />

          <NonBillableSection
            nonBillableTime={nonBillableTime}
            onNonBillableTimeChange={onNonBillableTimeChange}
          />

          <ExpensesSection
            monthlyExpenses={monthlyExpenses}
            onMonthlyExpensesChange={onMonthlyExpensesChange}
          />

          <ContributionsSection
            isAcreEligible={isAcreEligible}
            onAcreEligibleChange={onAcreEligibleChange}
          />
        </div>
      </div>
    </div>
  )
}
