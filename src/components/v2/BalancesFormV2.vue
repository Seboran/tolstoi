<script setup lang="ts">
import { useAsyncState } from '@vueuse/core'
import { ref } from 'vue'

import AffichageRemboursements from '@/components/AffichageRemboursements.vue'
import ChargementCalcul from '@/components/ChargementCalcul.vue'
import StyledButton from '@/components/StyledButton.vue'
import BalanceInputV2 from './BalanceInputV2.vue'
import { getHistorique } from '@/components/fetchHistorique'
import HistoriqueDepenses from '@/components/HistoriqueDepenses.vue'
import { useAjouterDepense } from '@/components/useAjouterDepense'
import { useBalances } from './useBalancesV2'
import { fetchBalances } from '@/components//useFetchBalances'

const { balances, nomsBalances, erreurBalance, addBalance, depensesParPersonne } = useBalances()
const { indexDepenseur, montant, bénéficiaires, ajouterDepense, historiqueDépenses } =
  useAjouterDepense(balances)

const loadHistorique = async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const id = urlParams.get('id')

  if (!id) return

  const { depense, noms } = await getHistorique(id)

  nomsBalances.value = noms
  balances.value = Array(noms.length).fill(0)
  depensesParPersonne.value = Array(noms.length).fill(0)

  depense.forEach(({ indexBeneficiaires, indexDepenseur: iDepenseur, montant: montantDepense }) => {
    indexDepenseur.value = iDepenseur
    montant.value = montantDepense
    bénéficiaires.value = indexBeneficiaires
    ajouterDepense()
  })
}

const { isReady } = useAsyncState(loadHistorique, undefined, { immediate: true })

const matriceDeRemboursements = ref<number[][]>([])
async function solveBalances() {
  if (Math.abs(erreurBalance.value) < 0.0001)
    try {
      matriceDeRemboursements.value = []
      const solution = await fetchBalances(balances)
      matriceDeRemboursements.value = solution.result_matrix
    } finally {
      //
    }
}

async function calculerRemboursements() {
  depensesParPersonne.value.filter(Boolean).forEach((depense, index) => {
    indexDepenseur.value = index
    montant.value = depense
    bénéficiaires.value = Array.from(Array(depensesParPersonne.value.length).keys())
    ajouterDepense()
  })
  try {
    await execute()
    depensesParPersonne.value = Array(nomsBalances.value.length).fill(0)
  } finally {
    //
  }
}

const { isLoading, execute } = useAsyncState(solveBalances, undefined)
</script>

<template>
  <div v-if="isReady" class="main-app">
    <section>
      <StyledButton label="Ajouter une personne" @click="addBalance" />
      <table title="Balances personnes">
        <template v-for="(_balance, index) in balances" :key="index">
          <BalanceInputV2
            v-model:balance="depensesParPersonne[index]"
            v-model:name="nomsBalances[index]"
          />
        </template>
      </table>
      <StyledButton label="Calculer remboursements" @click="calculerRemboursements"></StyledButton>
    </section>

    <template v-if="historiqueDépenses.length > 0">
      <section>
        <ChargementCalcul :isLoading="isLoading" />
        <AffichageRemboursements :matriceDeRemboursements :nomsBalances />
      </section>
      <section>
        <HistoriqueDepenses :historiqueDépenses="historiqueDépenses" :nomsBalances="nomsBalances" />
      </section>
    </template>
  </div>
</template>

<style scoped>
.main-app {
  display: flex;
  flex-direction: flex;
  flex-wrap: wrap;
  gap: 1rem;
  max-width: 1200px;
}
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  flex: 1;
  margin: 10px;
  width: 100%;
}
</style>
