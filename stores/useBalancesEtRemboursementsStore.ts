export const useBalancesEtRemboursementsStore = defineStore('balancesEtRemboursements', () => {
  const {
    calculerRemboursements,
    remboursementsModifies,
    calculLoading,
    historiqueDépenses,
    retirerBalancerEtViderComptes,
    balances,
    depensesParPersonne,
    nomsBalances,
    addBalance,
    matriceDeRemboursements
  } = useRemboursements()

  return {
    calculerRemboursements,
    remboursementsModifies,
    calculLoading,
    historiqueDépenses,
    retirerBalancerEtViderComptes,
    balances,
    depensesParPersonne,
    nomsBalances,
    addBalance,
    matriceDeRemboursements
  }
})
