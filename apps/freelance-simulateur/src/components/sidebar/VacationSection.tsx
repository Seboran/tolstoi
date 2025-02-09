import React from 'react'

type VacationSectionProps = {
  vacationDays: number
  onVacationDaysChange: (value: number) => void
}

export function VacationSection({ vacationDays, onVacationDaysChange }: VacationSectionProps) {
  return (
    <div className="mb-8">
      <h4 className="text-lg font-semibold text-navy-900 mb-4">Jours de vacances par an</h4>
      <div className="relative mb-2">
        <input
          type="range"
          min="0"
          max="60"
          value={vacationDays}
          onChange={(e) => onVacationDaysChange(Number(e.target.value))}
          className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="bg-blue-100 text-blue-900 px-4 py-1 rounded-lg font-medium">
            {vacationDays} jours
          </div>
        </div>
      </div>
    </div>
  )
}
