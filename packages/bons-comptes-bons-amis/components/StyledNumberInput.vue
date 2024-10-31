<script setup lang="ts">
import { disableButtons } from './injectSymbols/disableSymbol'

withDefaults(
  defineProps<{
    label: string
    id: string
    disabled?: boolean
  }>(),
  {
    disabled: false
  }
)
const balance = defineModel<number>({ required: true })
const disabledFromInject = inject(disableButtons, false)
</script>

<template>
  <DesignInput :id :label>
    <UInput
      class="w-full"
      :name="label"
      :id
      :disabled="disabled || disabledFromInject"
      type="number"
      v-model="balance"
    />
  </DesignInput>
</template>
