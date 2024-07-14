<script setup lang="ts">
import BalancesForm from '@/components/BalancesForm.vue'
import { useAsyncState } from '@vueuse/core'
import { createHistorique } from './components/fetchHistorique'

async function goToQueryParam() {
  const urlParams = new URLSearchParams(window.location.search)
  const idFromQuery = urlParams.get('id')

  if (idFromQuery) return
  const { id: idCreerALinstant } = await createHistorique([], [])
  urlParams.append('id', idCreerALinstant)
  window.history.replaceState(null, '', `?${urlParams.toString()}`)
}

const { isReady } = useAsyncState(goToQueryParam, undefined, { immediate: true })
</script>

<template>
  <main>
    <h1>Bons comptes bons amis</h1>
    <BalancesForm v-if="isReady" />
    <div v-else>Loading...</div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  align-items: center;
  height: 100vh; /* This ensures the main element takes up the full viewport height */
  flex-direction: column;
}
</style>
