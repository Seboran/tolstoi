import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { ProfessionCarousel } from './components/ProfessionCarousel';
import { Calculator } from './components/Calculator';
import { Profession } from './types';
import { professions } from './data/professions.tsx';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProfession, setSelectedProfession] = useState<Profession | null>(null);
  const [annualSalary, setAnnualSalary] = useState<number>(50000);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(5);
  const [vacationDays, setVacationDays] = useState<number>(25);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(500);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(professions.length / 4));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(professions.length / 4)) % Math.ceil(professions.length / 4));
  };

  const handleProfessionSelect = (profession: Profession) => {
    setSelectedProfession(profession);
    setAnnualSalary(profession.defaultSalary);
    setMonthlyExpenses(profession.defaultExpenses);
  };

  if (selectedProfession) {
    return (
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
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Simulateur de revenus <span className="text-blue-600">freelancing</span> vs <span className="text-blue-600">salariat</span>
          </h1>
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Je souhaite me lancer en tant que / Je suis
          </h2>
          
          <SearchBar />

          <ProfessionCarousel
            professions={professions}
            currentSlide={currentSlide}
            onPrevSlide={prevSlide}
            onNextSlide={nextSlide}
            onSelectProfession={handleProfessionSelect}
          />
        </div>

        <div className="text-center mt-12">
          <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
            Quelle est la différence entre les professions libérales et commerciales ?
          </a>
        </div>
      </main>
    </div>
  );
}

export default App;