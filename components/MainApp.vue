<script setup lang="ts">
import BalancesForm from '@/components/BalancesForm.vue'
import BalancesFormV2 from '@/components/v2/BalancesFormV2.vue'
import { ref } from 'vue'

const modeAvance = ref(false)
const { allowUserInput } = useCanUserInteract()
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
