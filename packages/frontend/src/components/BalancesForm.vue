<script setup lang="ts">
import { ref } from 'vue'
import AffichageRemboursements from '@/components/AffichageRemboursements.vue'
import { fetchBalances } from '@/components/useFetchBalances'

const balances = ref<number[]>([])

function addBalance() {
  balances.value.push(0)
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
</script>

<template>
  <div class="main-app">
    <section>
      <input type="button" value="Ajouter balance" @click="addBalance" />
      <template v-for="(_balance, index) in balances" :key="index">
        <input v-model="balances[index]" type="number" name="what" id="" />
      </template>
      Error:
      {{ balances.reduce((total, balance) => total + balance, 0).toFixed(2) }}
    </section>
    <section>
      <input type="button" value="Find balances" @click="solveBalances" />
      <AffichageRemboursements :matriceDeRemboursements="matriceDeRemboursements" />
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
