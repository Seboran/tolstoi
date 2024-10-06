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
</script>

<template>
  <Suspense>
    <UButton @click="onClick" :disabled v-on="$attrs" type="button" :value="label">{{
      label
    }}</UButton>
  </Suspense>
</template>

<style scoped></style>
