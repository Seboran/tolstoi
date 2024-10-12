<script setup lang="ts">
import { useAsyncState, useDebounceFn } from '@vueuse/core'
import { ref, watch } from 'vue'

import BalanceInput from '@/components/BalanceInput.vue'
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
      matriceDeRemboursements.value = solution?.result_matrix ?? []
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
  <TemplatesBalances>
    <template #premier-groupe>
      <table v-show="balances.length" title="Balances personnes">
        <template v-for="(_balance, index) in balances" :key="index">
          <BalanceInput v-model:balance="balances[index]" v-model:name="nomsBalances[index]" />
        </template>
      </table>
      <StyledButton label="Ajouter une personne" @click="addBalance" />
    </template>
    <template #deuxieme-groupe v-if="nomsBalances.length > 2">
      <AjoutDepenseFormulaire
        v-model:indexDepenseur="indexDepenseur"
        v-model:montant="montant"
        v-model:beneficiaire="bénéficiaires"
        :nomsBalances="nomsBalances"
        @ajouterDepense="ajouterDepense"
      />
      <hr />
    </template>
    <template #troisieme-groupe v-if="historiqueDépenses.length > 0">
      <UCommandPalette v-if="isLoading" loading placeholder="loading" :empty-state="null" />

      <AffichageRemboursementsV2 v-else :matriceDeRemboursements :nomsBalances />
      <h3 class="text-lg">Historique dépenses :</h3>
      <HistoriqueDepenses :historiqueDépenses="historiqueDépenses" :nomsBalances="nomsBalances" />
    </template>
  </TemplatesBalances>
</template>
