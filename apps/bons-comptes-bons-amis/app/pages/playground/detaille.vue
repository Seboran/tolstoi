<script setup lang="ts">
const { balances, nomsBalances, indexDepenseur, bénéficiaires, montant } = storeToRefs(
  useBalancesDetaillesStore(),
)
const { ajouterDepense } = useBalancesDetaillesStore()
balances.value = [0, 0, 0, 0]
nomsBalances.value = ['Nirina', 'Alice', 'Joseph', 'Émeline']
onMounted(() => {
  indexDepenseur.value = 1
  bénéficiaires.value = [0, 1, 2]
  montant.value = 500
  ajouterDepense()
})
</script>

<template><BalancesForm /></template>
