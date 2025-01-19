<script setup lang="ts">
import countries from '@/data/countries.json'
import matriceDeRemboursements from '@/data/matrix.json'
import AffichageRemboursementsV2 from 'layer-bons-comptes/components/v2/AffichageRemboursementsV2.vue'
import TradeFlowMap from '../TradeFlowMap.vue'
import BalanceInputV2 from './BalanceInputV2.vue'

const storeBalancesEtRemboursements = useBalancesEtRemboursementsStore()

const { calculLoading, historiqueDépenses, balances, depensesParPersonne, nomsBalances } =
  storeToRefs(storeBalancesEtRemboursements)

function addValueFromCountry({ nom, production, consommation }: ArgumentsCountry) {
  nomsBalances.value.push(nom)
  depensesParPersonne.value.push(production - consommation)
  balances.value.push(0)
}

interface ArgumentsCountry {
  consommation: number
  nom: string
  production: number
}

countries.forEach(addValueFromCountry)
const energiePerdue = countries
  .map(({ consommation, production }) => consommation - production)
  .reduce((a, b) => a + b, 0)
addValueFromCountry({ nom: 'pertes', production: energiePerdue, consommation: 0 })
</script>

<template>
  <Toaster ref="toaster">Veuillez ajouter au moins trois personnes</Toaster>

  <TemplatesBalances>
    <template #premier-groupe>
      <div v-if="calculLoading" class="space-y-2">
        <USkeleton class="h-4 w-full" />
        <USkeleton class="h-4 w-3/4" />
      </div>
      <ClientOnly>
        <TradeFlowMap :eu-countries="countries" :matrix="matriceDeRemboursements.slice(0, -1)" />
      </ClientOnly>
      <AffichageRemboursementsV2 :matriceDeRemboursements :nomsBalances />
    </template>
    <template #deuxieme-groupe v-if="historiqueDépenses.length > 0">
      <div v-show="balances.length" title="Balances personnes">
        <template v-for="(_balance, index) in balances" :key="index">
          <BalanceInputV2
            :production="countries[index]?.production!"
            :consommation="countries.at(index)?.consommation!"
            :name="nomsBalances[index]!"
          />
        </template>
      </div>
    </template>
  </TemplatesBalances>
</template>
