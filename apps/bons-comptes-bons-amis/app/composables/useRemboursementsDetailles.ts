import { useAsyncState, useDebounceFn } from '@vueuse/core'
import { useAjouterDepense } from '~/composables/useAjouterDepense'
import { useBalances } from '~/composables/useBalances'

export function useRemboursementsDetailles() {
  const { balances, nomsBalances, erreurBalance, addBalance } = useBalances()
  const { indexDepenseur, montant, bénéficiaires, ajouterDepense, historiqueDépenses } =
    useAjouterDepense(balances)

  const matriceDeRemboursements = ref<number[][]>([])
  async function _solveBalances() {
    if (Math.abs(erreurBalance.value) < 0.0001)
      try {
        matriceDeRemboursements.value = []
        const solution = await fetchBalances(balances)
        matriceDeRemboursements.value = solution ?? []
      } finally {
        //
      }
  }

  const solveBalances = useDebounceFn(_solveBalances, 1000)

  const { isLoading, execute } = useAsyncState(solveBalances, undefined, { immediate: true })

  watch(
    balances,
    async () => {
      await execute()
    },
    { deep: true }
  )

  return {
    isLoading,
    balances,
    addBalance,
    matriceDeRemboursements,
    indexDepenseur,
    montant,
    bénéficiaires,
    nomsBalances,
    erreurBalance,
    historiqueDépenses,
    ajouterDepense
  }
}
