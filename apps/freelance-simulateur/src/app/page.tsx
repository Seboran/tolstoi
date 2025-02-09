'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Calculator } from './components/Calculator.tsx'
import { Header } from './components/Header.tsx'
import { ProfessionCarousel } from './components/ProfessionCarousel.tsx'
import { professions } from './data/professions.tsx'
import type { Profession } from './types/index.ts'

function App() {
  const [currentSlide] = useState(0)
  const [selectedProfession, setSelectedProfession] = useState<Profession | null>(null)
  const [annualSalary, setAnnualSalary] = useState<number>(50000)
  const [daysPerWeek, setDaysPerWeek] = useState<number>(5)
  const [vacationDays, setVacationDays] = useState<number>(25)
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(500)

  const handleProfessionSelect = (profession: Profession) => {
    setSelectedProfession(profession)
    setAnnualSalary(profession.defaultSalary)
    setMonthlyExpenses(profession.defaultExpenses)
  }

  if (selectedProfession) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
        <Calculator
          profession={selectedProfession}
          onClose={() => setSelectedProfession(null)}
          annualSalary={annualSalary}
          daysPerWeek={daysPerWeek}
          vacationDays={vacationDays}
          monthlyExpenses={monthlyExpenses}
          onAnnualSalaryChange={setAnnualSalary}
          onDaysPerWeekChange={setDaysPerWeek}
          onVacationDaysChange={setVacationDays}
          onMonthlyExpensesChange={setMonthlyExpenses}
        />
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Header />

      <motion.main
        className="container mx-auto px-4 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-16">
          <motion.h1
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Simulateur de revenus{' '}
            <motion.span
              className="text-blue-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              freelancing
            </motion.span>{' '}
            vs{' '}
            <motion.span
              className="text-blue-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              salariat
            </motion.span>
          </motion.h1>

          <motion.h2
            className="text-3xl font-bold text-gray-800 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Je souhaite me lancer en tant que / Je suis
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <ProfessionCarousel
              professions={professions}
              currentSlide={currentSlide}
              onSelectProfession={handleProfessionSelect}
            />
          </motion.div>
        </div>
      </motion.main>
    </div>
  )
}

export default App
