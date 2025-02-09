import React from 'react';
import { 
  Code2,
  Shapes,
  LineChart,
  Pencil,
  Briefcase,
  ShoppingBag
} from 'lucide-react';
import { Profession } from '../types';

export const professions: Profession[] = [
  {
    icon: <Code2 className="w-12 h-12 text-blue-500" />,
    title: "Développeur·euse",
    defaultSalary: 55000,
    defaultExpenses: 800,
    bgColor: "bg-blue-50",
  },
  {
    icon: <Shapes className="w-12 h-12 text-purple-500" />,
    title: "Designer",
    defaultSalary: 45000,
    defaultExpenses: 600,
    bgColor: "bg-purple-50",
  },
  {
    icon: <LineChart className="w-12 h-12 text-emerald-500" />,
    title: "Consultant·e",
    defaultSalary: 65000,
    defaultExpenses: 1000,
    bgColor: "bg-emerald-50",
  },
  {
    icon: <Pencil className="w-12 h-12 text-amber-500" />,
    title: "Journaliste",
    defaultSalary: 40000,
    defaultExpenses: 400,
    bgColor: "bg-amber-50",
  },
  {
    icon: <Briefcase className="w-12 h-12 text-indigo-500" />,
    title: "Autre prestation de service",
    defaultSalary: 45000,
    defaultExpenses: 500,
    bgColor: "bg-indigo-50",
  },
  {
    icon: <ShoppingBag className="w-12 h-12 text-rose-500" />,
    title: "Autre profession d'achat/vente",
    defaultSalary: 42000,
    defaultExpenses: 700,
    bgColor: "bg-rose-50",
  },
];