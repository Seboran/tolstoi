<script setup lang="ts">
import { disableButtons } from './injectSymbols/disableSymbol'

const props = defineProps<{ label: string; disabled?: boolean }>()

const emit = defineEmits<{
  click: [...args: unknown[]]
}>()

function onClick(...args: unknown[]) {
  if (props.disabled) {
    return
  }
  emit('click', args)
}

const { allowUserInput } = useCanUserInteract()
const disabledFromParent = inject(disableButtons, false)
</script>

<template>
  <UButton
    @click="onClick"
    class="dark:text-white"
    :disabled="!allowUserInput || disabled || disabledFromParent"
    v-on="$attrs"
    type="button"
    :value="label"
    >{{ label }}</UButton
  >
</template>

<style scoped></style>
