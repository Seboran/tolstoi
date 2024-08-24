<template>
  <StyledButton v-if="!idBalances" label="Créer une session" @click="goToQueryParam" />
  <BalancesForm v-else />
</template>

<script setup lang="ts">
import { createHistorique } from '@/components/fetchHistorique'
import { onMounted, ref } from 'vue'
import StyledButton from '@/components/StyledButton.vue'
import BalancesForm from '@/components/BalancesForm.vue'

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
