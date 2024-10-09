<script setup lang="ts">
import { ref } from 'vue'
import BalancesFormV2 from '@/components/v2/BalancesFormV2.vue'
import BalancesForm from '@/components/BalancesForm.vue'

const modeAvance = ref(false)
const allowUserInput = ref(false)
onNuxtReady(() => {
  allowUserInput.value = true
})
</script>

<template>
  <UCheckbox
    :disabled="!allowUserInput"
    class="self-end"
    v-model="modeAvance"
    label="Mode avancé"
  />
  <BalancesForm v-if="modeAvance" />
  <BalancesFormV2 v-else />
</template>
