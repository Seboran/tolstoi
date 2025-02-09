import React from 'react'
import type { Profession } from '../types'

type ProfessionCardProps = {
  profession: Profession
  onSelect: (profession: Profession) => void
}

export function ProfessionCard({ profession, onSelect }: ProfessionCardProps) {
  return (
    <div
      className={`${profession.bgColor} w-48 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer group`}
      onClick={() => onSelect(profession)}
    >
      <div className="flex flex-col items-center">
        <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
          {profession.icon}
        </div>
        <h3 className="font-medium text-gray-900 text-center">{profession.title}</h3>
      </div>
    </div>
  )
}
