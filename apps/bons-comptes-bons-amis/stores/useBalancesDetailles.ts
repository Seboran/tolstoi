export const useBalancesDetaillesStore = defineStore('balancesDetailles', () => {
  const use = useRemboursementsDetailles()
  return {
    ...use,
    $reset: function () {
      use.balances.value.splice(0)
      use.nomsBalances.value.splice(0)
      use.historiqueDépenses.value.splice(0)
      use.bénéficiaires.value.splice(0)
      use.matriceDeRemboursements.value.splice(0)
      use.montant.value = 0
      use.indexDepenseur.value = 0
    }
  }
})
