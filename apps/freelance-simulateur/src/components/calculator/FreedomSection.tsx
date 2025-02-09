import React from 'react';

type FreedomSectionProps = {
  annualSalary: number;
  dailyRate: number;
  effectiveWorkingDays: number;
  vacationDays: number;
  nonBillableTime: number;
  isAcreEligible: boolean;
};

export function FreedomSection({
  annualSalary,
  dailyRate,
  effectiveWorkingDays,
  vacationDays,
  nonBillableTime,
  isAcreEligible,
}: FreedomSectionProps) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        À vous la liberté
      </h3>
      <p className="text-gray-600 mb-4">
        Pour gagner l'équivalent de <span className="font-bold text-gray-900">{annualSalary.toLocaleString('fr-FR')} € bruts</span>, 
        nous vous recommandons de facturer au minimum <span className="font-bold text-gray-900">{dailyRate} € par jour</span>. 
        Ce calcul est basé sur {effectiveWorkingDays.toFixed(0)} jours facturables par an, en tenant compte de vos {vacationDays} jours de congés
        et {Math.round(nonBillableTime)}% de temps non facturable.
        {isAcreEligible && " Le dispositif ACRE a été pris en compte dans ce calcul."}
      </p>
    </div>
  );
}