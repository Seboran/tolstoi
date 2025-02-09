import React from 'react';
import { AlertTriangle } from 'lucide-react';

type ThresholdWarningProps = {
  isOverThreshold: boolean;
  effectiveWorkingDays: number;
  dailyRate: number;
  potentialAnnualRevenue: number;
};

export function ThresholdWarning({
  isOverThreshold,
  effectiveWorkingDays,
  dailyRate,
  potentialAnnualRevenue,
}: ThresholdWarningProps) {
  if (!isOverThreshold) return null;

  return (
    <div className="bg-pink-50 text-pink-600 p-4 rounded-lg mb-4 flex items-start gap-3">
      <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <div className="text-left text-sm">
        <p className="font-medium">
          Attention, avec {Math.round(effectiveWorkingDays)} jours facturés à {dailyRate}€, 
          votre chiffre d'affaires annuel serait de {Math.round(potentialAnnualRevenue).toLocaleString('fr-FR')}€. 
          Vous dépasseriez le plafond de la micro-entreprise (75 000€).
        </p>
        <a href="#" className="inline-block mt-2 font-medium hover:text-pink-700">
          En savoir plus
        </a>
      </div>
    </div>
  );
}