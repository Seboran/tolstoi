'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Calculator } from '../components/Calculator'
import type { Profession } from '../types'

interface PropsProfessionCalculator {
  profession: Profession
}

export default function ProfessionCalculator({ profession }: PropsProfessionCalculator) {
  const [annualSalary, setAnnualSalary] = useState<number>(profession?.defaultSalary || 50000)
  const [daysPerWeek, setDaysPerWeek] = useState<number>(5)
  const [vacationDays, setVacationDays] = useState<number>(25)
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(profession?.defaultExpenses ?? 0)

  if (!profession) {
    return <div>Profession not found</div>
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
      <Calculator
        profession={profession}
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
