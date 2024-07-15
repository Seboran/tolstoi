<script setup lang="ts">
import BalancesForm from '@/components/BalancesForm.vue'
import StyledButton from './components/StyledButton.vue'
import { createHistorique } from './components/fetchHistorique'
import { onMounted, ref } from 'vue'

async function goToQueryParam() {
  const { id: idCreerALinstant } = await createHistorique([], [])
  const urlParams = new URLSearchParams(window.location.search)
  urlParams.delete('id')
  urlParams.append('id', idCreerALinstant)
  window.history.replaceState(null, '', `?${urlParams.toString()}`)
  idBalances.value = idCreerALinstant
}

const idBalances = ref<string | null>(null)
onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const idFromQuery = urlParams.get('id')

  idBalances.value = idFromQuery
})
</script>

<template>
  <header>
    <h1>Bons comptes bons amis</h1>
  </header>
  <main>
    <StyledButton v-if="!idBalances" label="Créer une session" @click="goToQueryParam" />
    <BalancesForm v-else />
  </main>
</template>

<style scoped>
header {
  margin: auto;
  text-align: center;
}
</style>
