<script setup lang="ts">
import { useAsyncState, useDebounceFn } from '@vueuse/core'
import { ref, watch } from 'vue'

import BalanceInput from '@/components/BalanceInput.vue'
import ChargementCalcul from '@/components/ChargementCalcul.vue'
import AjoutDepenseFormulaire from './AjoutDepenseFormulaire.vue'
import HistoriqueDepenses from './HistoriqueDepenses.vue'
import StyledButton from './StyledButton.vue'
import { useAjouterDepense } from './useAjouterDepense'
import { useBalances } from './useBalances'
import { fetchBalances } from './useFetchBalances'
import AffichageRemboursementsV2 from './v2/AffichageRemboursementsV2.vue'

const { balances, nomsBalances, erreurBalance, addBalance } = useBalances()
const { indexDepenseur, montant, bénéficiaires, ajouterDepense, historiqueDépenses } =
  useAjouterDepense(balances)

const matriceDeRemboursements = ref<number[][]>([])
async function _solveBalances() {
  if (Math.abs(erreurBalance.value) < 0.0001)
    try {
      matriceDeRemboursements.value = []
      const solution = await fetchBalances(balances)
      matriceDeRemboursements.value = solution.result_matrix
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
</script>

<template>
  <div class="main-app">
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
        <AffichageRemboursementsV2 :matriceDeRemboursements :nomsBalances />
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
