<script setup lang="ts">
import AffichageRemboursements from '@/components/AffichageRemboursements.vue'
import BalanceInput from '@/components/BalanceInput.vue'
import { fetchBalances } from '@/components/useFetchBalances'
import { useAsyncState } from '@vueuse/core'
import { computed, ref } from 'vue'
import ChargementCalcul from '@/components/ChargementCalcul.vue'
import NOMS_AU_HASARD from '@/nomsAuHasard.json'
const balances = ref<number[]>([])
const nomsBalances = ref<string[]>([])

function addBalance() {
  balances.value.push(0)
  nomsBalances.value.push(NOMS_AU_HASARD[nomsBalances.value.length])
}

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

const { isLoading, execute } = useAsyncState(solveBalances, undefined, { immediate: false })

const erreurBalance = computed(() =>
  balances.value
    .filter((b) => !isNaN(b))
    .reduce((total, balance) => total + balance, 0)
    .toFixed(2)
)
</script>

<template>
  <div class="main-app">
    <section>
      <input type="button" value="Ajouter balance" @click="addBalance" />
      <template v-for="(_balance, index) in balances" :key="index">
        <BalanceInput v-model:balance="balances[index]" v-model:name="nomsBalances[index]" />
      </template>
      Erreur de comptes à régler:
      {{ erreurBalance }}
    </section>
    <section>
      <input type="button" value="Calculer remboursements" @click="execute()" />
      <ChargementCalcul :isLoading="isLoading" />
      <AffichageRemboursements :matriceDeRemboursements :nomsBalances />
    </section>
  </div>
</template>

<style scoped>
.main-app {
  display: flex;
  flex-direction: flex;
  gap: 1rem;
  max-width: 1200px;
}
section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
