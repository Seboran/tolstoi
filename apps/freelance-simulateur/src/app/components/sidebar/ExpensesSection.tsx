import React from 'react'

type ExpensesSectionProps = {
  monthlyExpenses: number
  onMonthlyExpensesChange: (value: number) => void
}

export function ExpensesSection({
  monthlyExpenses,
  onMonthlyExpensesChange,
}: ExpensesSectionProps) {
  return (
    <section>
      <h3 className="text-2xl font-bold text-navy-900 mb-6">Frais professionnels</h3>
      <div>
        <h4 className="text-lg font-semibold text-navy-900 mb-4">
          Estimation du montant des frais professionnels par mois
        </h4>
        <div className="relative mb-2">
          <input
            type="range"
            min="0"
            max="2000"
            step="50"
            value={monthlyExpenses}
            onChange={(e) => onMonthlyExpensesChange(Number(e.target.value))}
            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="bg-blue-100 text-blue-900 px-4 py-1 rounded-lg font-medium">
              {monthlyExpenses} €
            </div>
          </div>
        </div>
        <p className="text-gray-500 text-sm mt-8">
          Il s'agit des frais nécessaires pour faire fonctionner votre activité, par exemple
          matériel informatique, frais de transport, essence...
        </p>
      </div>
    </section>
  )
}
