<script setup lang="ts">
const { balances, depensesParPersonne, nomsBalances } = storeToRefs(
  useBalancesEtRemboursementsStore(),
)
const { calculerRemboursements } = useBalancesEtRemboursementsStore()
balances.value = [0, 0, 0, 0]
nomsBalances.value = ['Nirina', 'Alice', 'Joseph', 'Émeline']
depensesParPersonne.value = [230, 12, 200, 42]

onMounted(() => {
  calculerRemboursements()
})
</script>

<template><V2BalancesFormV2 /></template>
