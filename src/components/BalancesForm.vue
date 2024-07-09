<script setup lang="ts">
import AffichageRemboursements from '@/components/AffichageRemboursements.vue'
import BalanceInput from '@/components/BalanceInput.vue'
import ChargementCalcul from '@/components/ChargementCalcul.vue'
import { useAsyncState } from '@vueuse/core'
import { ref, watch } from 'vue'
import AjoutDepenseFormulaire from './AjoutDepenseFormulaire.vue'
import HistoriqueDepenses from './HistoriqueDepenses.vue'
import { useAjouterDepense } from './useAjouterDepense'
import { useBalances } from './useBalances'
import { fetchBalances } from './useFetchBalances'

const { balances, nomsBalances, erreurBalance, addBalance } = useBalances()
const { indexDepenseur, montant, bénéficiaires, ajouterDepense, historiqueDépenses } =
  useAjouterDepense(balances)

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

const { isLoading, execute } = useAsyncState(solveBalances, undefined, { immediate: false })

watch(
  balances,
  () => {
    execute()
  },
  { deep: true }
)
</script>

<template>
  <div class="main-app">
    <section>
      <AjoutDepenseFormulaire
        v-model:indexDepenseur="indexDepenseur"
        v-model:montant="montant"
        v-model:beneficiaire="bénéficiaires"
        :nomsBalances="nomsBalances"
        @ajouterDepense="ajouterDepense"
      />
    </section>
    <section>
      <input type="button" value="Ajouter une personne" @click="addBalance" />
      <template v-for="(_balance, index) in balances" :key="index">
        <BalanceInput v-model:balance="balances[index]" v-model:name="nomsBalances[index]" />
      </template>
      Erreur de comptes à régler:
      {{ erreurBalance.toFixed(2) }}
    </section>
    <section>
      <input type="button" value="Calculer remboursements" @click="execute()" />
      <ChargementCalcul :isLoading="isLoading" />
      <AffichageRemboursements :matriceDeRemboursements :nomsBalances />
    </section>
    <section>
      <HistoriqueDepenses :historiqueDépenses="historiqueDépenses" :nomsBalances="nomsBalances" />
    </section>
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
  gap: 1rem;
  flex: 1;
  margin: 10px;
}
</style>
ref, import { fetchBalances } from './useFetchBalances'
