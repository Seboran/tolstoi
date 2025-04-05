import React from 'react'

type ContributionsSectionProps = {
  isAcreEligible: boolean
  onAcreEligibleChange: (value: boolean) => void
}

export function ContributionsSection({
  isAcreEligible,
  onAcreEligibleChange,
}: ContributionsSectionProps) {
  return (
    <section>
      <h3 className="text-2xl font-bold text-navy-900 mb-6">Cotisations</h3>
      <div className="space-y-6 pb-4">
        <div>
          <h4 className="text-lg font-semibold text-navy-900 mb-4">
            Je suis éligible à l'ACRE (ex ACCRE)
          </h4>
          <div className="flex gap-3">
            <button
              onClick={() => onAcreEligibleChange(true)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                isAcreEligible ? 'bg-blue-600 text-white' : 'bg-gray-100 text-dark'
              }`}
            >
              Oui
            </button>
            <button
              onClick={() => onAcreEligibleChange(false)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                !isAcreEligible ? 'bg-blue-600 text-white' : 'bg-gray-100 text-dark'
              }`}
            >
              Non
            </button>
          </div>
          <p className="text-dark text-sm mt-4">
            Il s'agit d'un dispositif de l'État permettant de payer moins de cotisation en fonction
            de certaines conditions, par exemple si vous avez moins de 25 ans ou vous reprenez une
            activité.
          </p>
          <a href="#" className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium">
            Suis-je éligible à l'ACRE ?
          </a>
        </div>
      </div>
    </section>
  )
}
