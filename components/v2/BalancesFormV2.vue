<script setup lang="ts">
import { useAsyncState, useDebounceFn } from '@vueuse/core'
import { ref, watch } from 'vue'

import StyledButton from '@/components/StyledButton.vue'
import { useAjouterDepense } from '@/components/useAjouterDepense'
import { fetchBalances } from '@/components/useFetchBalances'
import AffichageRemboursementsV2 from '@/components/v2/AffichageRemboursementsV2.vue'
import BalanceInputV2 from './BalanceInputV2.vue'
import { useBalances } from './useBalancesV2'

const { balances, nomsBalances, retirerBalance, addBalance, depensesParPersonne } = useBalances()
const { indexDepenseur, montant, bénéficiaires, ajouterDepense, historiqueDépenses } =
  useAjouterDepense(balances)

const matriceDeRemboursements = ref<number[][]>([])
async function _solveBalances() {
  try {
    matriceDeRemboursements.value = []
    const solution = await fetchBalances(balances)
    matriceDeRemboursements.value = solution.result_matrix
  } finally {
    //
  }
}

const solveBalances = useDebounceFn(_solveBalances, 1000)

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
  <div class="flex flex-wrap gap-4 min-w-80 justify-center">
    <section class="min-w-80 flex flex-col justify-center gap-4">
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
      <section class="min-w-80">
        <UCommandPalette v-if="isLoading" loading placeholder="loading" :emptyState="null" />
        <AffichageRemboursementsV2 v-else :matriceDeRemboursements :nomsBalances />
      </section>
    </template>
  </div>
</template>
