import NOMS_AU_HASARD from '@/composables/nomsAuHasard.json'
import { computed, ref } from 'vue'

export function useBalances() {
  const balances = ref<number[]>([])
  const nomsBalances = ref<string[]>([])
  const depensesParPersonne = ref<number[]>([])

  const erreurBalance = computed(() =>
    balances.value.filter((b) => !isNaN(b)).reduce((total, balance) => total + balance, 0),
  )

  function addBalance() {
    balances.value.push(0)
    depensesParPersonne.value.push(0)
    nomsBalances.value.push(NOMS_AU_HASARD[nomsBalances.value.length] ?? '')
  }

  function retirerBalance(index: number) {
    balances.value.splice(index, 1)
    nomsBalances.value.splice(index, 1)
    depensesParPersonne.value.splice(index, 1)
  }

  return {
    balances,
    nomsBalances,
    erreurBalance,
    addBalance,
    retirerBalance,
    depensesParPersonne,
  }
}
