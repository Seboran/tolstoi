import React from 'react'

type WeekDay = {
  key: string
  label: string
}

type WorkingDaysSectionProps = {
  selectedDays: boolean[]
  onDayToggle: (index: number) => void
}

const weekDays: WeekDay[] = [
  { key: 'mon', label: 'L' },
  { key: 'tue', label: 'M' },
  { key: 'wed', label: 'M' },
  { key: 'thu', label: 'J' },
  { key: 'fri', label: 'V' },
  { key: 'sat', label: 'S' },
  { key: 'sun', label: 'D' },
]

export function WorkingDaysSection({ selectedDays, onDayToggle }: WorkingDaysSectionProps) {
  return (
    <section>
      <h3 className="text-2xl font-bold text-navy-900 mb-6">Nombre de jours facturés</h3>

      <div className="mb-8">
        <h4 className="text-lg font-semibold text-navy-900 mb-4">Mes jours ouvrés</h4>
        <div className="flex gap-2">
          {weekDays.map((day, index) => (
            <button
              key={day.key}
              onClick={() => onDayToggle(index)}
              className={`w-12 h-12 rounded-lg font-medium flex items-center justify-center transition-colors ${
                selectedDays[index] ? 'bg-blue-600 text-white' : 'bg-gray-100 text-dark'
              }`}
            >
              {day.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
