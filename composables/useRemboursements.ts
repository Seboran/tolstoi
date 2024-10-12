import { useAsyncState, useDebounceFn } from '@vueuse/core'
import { useAjouterDepense } from '~/components/useAjouterDepense'
import { fetchBalances } from '~/components/useFetchBalances'
import { useBalances } from '~/components/v2/useBalancesV2'

export function useRemboursements() {
  const { balances, nomsBalances, retirerBalance, addBalance, depensesParPersonne } = useBalances()
  const { indexDepenseur, montant, bénéficiaires, ajouterDepense, historiqueDépenses } =
    useAjouterDepense(balances)
  const matriceDeRemboursements = ref<number[][]>([])
  async function _solveBalances() {
    try {
      matriceDeRemboursements.value = []
      const solution = await fetchBalances(balances)
      if (solution) {
        matriceDeRemboursements.value = solution.result_matrix
      }
    } finally {
      //
    }
  }

  const modified = ref(true)

  const solveBalances = useDebounceFn(_solveBalances, 1000)
  const { isLoading, execute } = useAsyncState(solveBalances, undefined, { immediate: true })

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
      await execute()
    } catch (e) {
      modified.value = true
    }
  }

  watch(
    depensesParPersonne,
    () => {
      modified.value = true
    },
    { deep: true }
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
    matriceDeRemboursements
  }
}
