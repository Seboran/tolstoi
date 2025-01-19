import { useAsyncState, useDebounceFn } from '@vueuse/core'
import { useAjouterDepense } from './useAjouterDepense'
import { useBalances } from './v2/useBalancesV2'
export function useRemboursements() {
  const { balances, nomsBalances, retirerBalance, addBalance, depensesParPersonne } = useBalances()
  const { indexDepenseur, montant, bénéficiaires, ajouterDepense, historiqueDépenses } =
    useAjouterDepense(balances)
  const matriceDeRemboursements = ref<number[][]>([])
  async function _solveBalances() {
    if (balances.value.length === 0) {
      return
    }

    if (balances.value.reduce((a, b) => a ** 2 + b ** 2, 0) === 0) {
      return
    }
    try {
      matriceDeRemboursements.value = []
      const solution = await fetchBalances(balances)
      if (solution) {
        matriceDeRemboursements.value = solution
      }
    } finally {
      //
    }
  }

  const modified = ref(true)

  const solveBalances = useDebounceFn(_solveBalances, 1000)
  const { isLoading, execute: calculerSimplementRemboursements } = useAsyncState(
    solveBalances,
    undefined,
    { immediate: true },
  )

  async function calculerRemboursements() {
    historiqueDépenses.value.splice(0)
    balances.value = Array(nomsBalances.value.length).fill(0)

    depensesParPersonne.value.forEach((depense, index) => {
      indexDepenseur.value = index
      montant.value = depense
      bénéficiaires.value = Array.from(Array(depensesParPersonne.value.length).keys())
      ajouterDepense()
    })
    try {
      modified.value = false
      await calculerSimplementRemboursements()
    } catch (e) {
      modified.value = true
    }
  }

  watch(
    depensesParPersonne,
    () => {
      modified.value = true
    },
    { deep: true },
  )

  function retirerBalancerEtViderComptes(index: number) {
    balances.value = Array(nomsBalances.value.length).fill(0)
    historiqueDépenses.value.splice(0)

    retirerBalance(index)
  }

  return {
    calculerRemboursements,
    remboursementsModifies: modified,
    calculLoading: isLoading,
    historiqueDépenses,
    depensesParPersonne,
    retirerBalance,
    retirerBalancerEtViderComptes,
    balances,
    nomsBalances,
    addBalance,
    matriceDeRemboursements,
    calculerSimplementRemboursements,
  }
}
