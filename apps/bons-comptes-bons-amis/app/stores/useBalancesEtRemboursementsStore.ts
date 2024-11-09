export const useBalancesEtRemboursementsStore = defineStore('balancesEtRemboursements', () => {
  const use = useRemboursements()
  return {
    ...use,
    $reset: function () {
      use.balances.value.splice(0)
      use.nomsBalances.value.splice(0)
      use.historiqueDépenses.value.splice(0)
      use.matriceDeRemboursements.value.splice(0)
      use.calculLoading.value = false
    }
  }
})
