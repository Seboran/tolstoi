<script setup lang="ts">
import { useAsyncState } from '@vueuse/core'
import { onMounted, ref, watch } from 'vue'

import AffichageRemboursements from '@/components/AffichageRemboursements.vue'
import BalanceInput from '@/components/BalanceInput.vue'
import ChargementCalcul from '@/components/ChargementCalcul.vue'
import AjoutDepenseFormulaire from './AjoutDepenseFormulaire.vue'
import HistoriqueDepenses from './HistoriqueDepenses.vue'
import StyledButton from './StyledButton.vue'
import { getHistorique, updateHistorique } from './fetchHistorique'
import { useAjouterDepense } from './useAjouterDepense'
import { useBalances } from './useBalances'
import { fetchBalances } from './useFetchBalances'

const { balances, nomsBalances, erreurBalance, addBalance } = useBalances()
const { indexDepenseur, montant, bénéficiaires, ajouterDepense, historiqueDépenses } =
  useAjouterDepense(balances)

const loadHistorique = async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const id = urlParams.get('id')

  if (!id) return

  const { depense, noms } = await getHistorique(id)

  nomsBalances.value = noms
  balances.value = Array(noms.length).fill(0)

  depense.forEach(({ indexBeneficiaires, indexDepenseur: iDepenseur, montant: montantDepense }) => {
    indexDepenseur.value = iDepenseur
    montant.value = montantDepense
    bénéficiaires.value = indexBeneficiaires
    ajouterDepense()
  })
  await execute()
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

const { isLoading, execute } = useAsyncState(solveBalances, undefined, { immediate: true })

watch(
  balances,
  async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')
    await updateHistorique(id!, historiqueDépenses.value, nomsBalances.value)
    await execute()
  },
  { deep: true }
)
</script>

<template>
  <div v-if="isReady" class="main-app">
    <section>
      <StyledButton label="Ajouter une personne" @click="addBalance" />
      <table title="Balances personnes">
        <template v-for="(_balance, index) in balances" :key="index">
          <BalanceInput v-model:balance="balances[index]" v-model:name="nomsBalances[index]" />
        </template>
      </table>
    </section>
    <section v-if="nomsBalances.length > 2">
      <AjoutDepenseFormulaire
        v-model:indexDepenseur="indexDepenseur"
        v-model:montant="montant"
        v-model:beneficiaire="bénéficiaires"
        :nomsBalances="nomsBalances"
        @ajouterDepense="ajouterDepense"
      />
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
