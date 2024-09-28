<script setup lang="ts">
import { useAsyncState } from '@vueuse/core'
import { ref, watch } from 'vue'

import { fetchBalances } from '@/components//useFetchBalances'
import AffichageRemboursements from '@/components/AffichageRemboursements.vue'
import ChargementCalcul from '@/components/ChargementCalcul.vue'
import { getHistorique } from '@/components/fetchHistorique'
import StyledButton from '@/components/StyledButton.vue'
import { useAjouterDepense } from '@/components/useAjouterDepense'
import BalanceInputV2 from './BalanceInputV2.vue'
import { useBalances } from './useBalancesV2'

const { balances, nomsBalances, retirerBalance, addBalance, depensesParPersonne } = useBalances()
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
  try {
    matriceDeRemboursements.value = []
    const solution = await fetchBalances(balances)
    matriceDeRemboursements.value = solution.result_matrix
  } finally {
    //
  }
}

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

const modified = ref(true)

const { isLoading, execute } = useAsyncState(solveBalances, undefined, { immediate: true })

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
</script>

<template>
  <div v-if="isReady" class="main-app">
    <section>
      <table title="Balances personnes">
        <template v-for="(_balance, index) in balances" :key="index">
          <BalanceInputV2
            v-model:balance="depensesParPersonne[index]"
            v-model:name="nomsBalances[index]"
            @remove="retirerBalancerEtViderComptes(index)"
          />
        </template>
      </table>
      <StyledButton label="Ajouter une personne" @click="addBalance" />
      <StyledButton
        v-if="balances.length >= 2"
        label="Calculer remboursements"
        :disabled="!modified"
        @click="calculerRemboursements"
      ></StyledButton>
    </section>

    <template v-if="historiqueDépenses.length > 0">
      <section>
        <ChargementCalcul :isLoading="isLoading" />
        <AffichageRemboursements :matriceDeRemboursements :nomsBalances />
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
