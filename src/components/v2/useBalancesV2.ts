import NOMS_AU_HASARD from '@/nomsAuHasard.json'
import { computed, ref } from 'vue'

export function useBalances() {
  const balances = ref<number[]>([])
  const nomsBalances = ref<string[]>([])
  const depensesParPersonne = ref<number[]>([])

  const erreurBalance = computed(() =>
    balances.value.filter((b) => !isNaN(b)).reduce((total, balance) => total + balance, 0)
  )

  function addBalance() {
    balances.value.push(0)
    depensesParPersonne.value.push(0)
    nomsBalances.value.push(NOMS_AU_HASARD[nomsBalances.value.length])
  }

  return {
    balances,
    nomsBalances,
    erreurBalance,
    addBalance,
    depensesParPersonne
  }
}
