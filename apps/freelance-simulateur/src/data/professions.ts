import { Code, Palette, LineChart, Newspaper, BarChart3, Store } from 'lucide-react';
import { Profession } from '../types';

export const professions: Profession[] = [
  {
    icon: <Code className="w-12 h-12" />,
    title: "Développeur·euse",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=200&h=200",
    defaultSalary: 55000,
    defaultExpenses: 800,
  },
  {
    icon: <Palette className="w-12 h-12" />,
    title: "Designer",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=200&h=200",
    defaultSalary: 45000,
    defaultExpenses: 600,
  },
  {
    icon: <LineChart className="w-12 h-12" />,
    title: "Consultant·e",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=200&h=200",
    defaultSalary: 65000,
    defaultExpenses: 1000,
  },
  {
    icon: <Newspaper className="w-12 h-12" />,
    title: "Journaliste",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=200&h=200",
    defaultSalary: 40000,
    defaultExpenses: 400,
  },
  {
    icon: <BarChart3 className="w-12 h-12" />,
    title: "Autre prestation de service",
    image: "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=200&h=200",
    defaultSalary: 45000,
    defaultExpenses: 500,
  },
  {
    icon: <Store className="w-12 h-12" />,
    title: "Autre profession d'achat/vente",
    image: "https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?auto=format&fit=crop&q=80&w=200&h=200",
    defaultSalary: 42000,
    defaultExpenses: 700,
  },
];