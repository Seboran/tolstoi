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

const { allowUserInput } = useCanUserInteract()
</script>

<template>
  <UButton
    @click="onClick"
    class="dark:text-white"
    :disabled="!allowUserInput || disabled"
    v-on="$attrs"
    type="button"
    :value="label"
    >{{ label }}</UButton
  >
</template>

<style scoped></style>
