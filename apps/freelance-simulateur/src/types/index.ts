import { ReactNode } from 'react';

export type Profession = {
  icon: ReactNode;
  title: string;
  defaultSalary: number;
  defaultExpenses: number;
  bgColor: string;
};