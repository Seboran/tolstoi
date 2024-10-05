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
  <input @click="onClick" v-on="$attrs" type="button" :class="{ disabled }" :value="label" />
</template>

<style scoped>
input {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.2s;
}

.disabled {
  background-color: gainsboro;
  cursor: unset;
}
</style>
