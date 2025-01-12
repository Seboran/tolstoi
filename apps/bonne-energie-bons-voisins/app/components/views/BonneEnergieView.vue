<script lang="ts" setup>
import countries from '@/data/countries.json'
import AffichageRemboursementsV2 from 'layer-bons-comptes/components/v2/AffichageRemboursementsV2.vue'

const { balances, nomsBalances, calculerSimplementRemboursements, matriceDeRemboursements } =
  useRemboursements()

for (let { consommation, nom, production } of countries) {
  nomsBalances.value.push(nom)
  balances.value.push(production - consommation)
}

nomsBalances.value.push('pertes')
balances.value.push(
  countries
    .map(({ consommation, production }) => consommation - production)
    .reduce((a, b) => a + b, 0),
)

onMounted(calculerSimplementRemboursements)
</script>

<template>
  {{ countries }}

  <AffichageRemboursementsV2 :nomsBalances :matriceDeRemboursements />
</template>
