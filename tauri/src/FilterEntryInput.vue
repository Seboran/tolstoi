<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
function updateValue(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <label for="search">Chercher entrée</label>
  porque
  {{ modelValue }}
  coucou
  <input
    id="search"
    type="search"
    name="search"
    :value="modelValue"
    @update:modelValue="updateValue"
  />
</template>
