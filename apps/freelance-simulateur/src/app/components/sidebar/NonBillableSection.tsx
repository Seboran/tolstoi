import React from 'react'

type NonBillableSectionProps = {
  nonBillableTime: number
  onNonBillableTimeChange: (value: number) => void
}

export function NonBillableSection({
  nonBillableTime,
  onNonBillableTimeChange,
}: NonBillableSectionProps) {
  return (
    <div className="mt-12 mb-8">
      <h4 className="text-lg font-semibold text-navy-900 mb-4">Temps non facturé</h4>
      <div className="relative mb-2">
        <input
          type="range"
          min="0"
          max="50"
          value={nonBillableTime}
          onChange={(e) => onNonBillableTimeChange(Number(e.target.value))}
          className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="bg-blue-100 text-blue-900 px-4 py-1 rounded-lg font-medium">
            {nonBillableTime} %
          </div>
        </div>
      </div>
      <p className="text-gray-500 text-sm mt-8">
        Il s'agit du temps passé entre les missions pour prospecter, gérer la relation client ou
        encore gérer la partie administrative.
      </p>
    </div>
  )
}
