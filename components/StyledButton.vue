<script setup lang="ts">
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

const allowUserInput = ref(false)
onNuxtReady(() => {
  allowUserInput.value = true
})
</script>

<template>
  <UButton
    @click="onClick"
    :disabled="!allowUserInput || disabled"
    v-on="$attrs"
    type="button"
    :value="label"
    >{{ label }}</UButton
  >
</template>

<style scoped></style>
