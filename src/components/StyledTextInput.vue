<script setup lang="ts">
defineProps<{
  label: string | undefined
}>()

const name = defineModel<string>({ required: true })
</script>

<template>
  <input :label v-model="name" type="text" />
</template>

<style scoped>
input {
  background-color: #f8f9fa;
  color: #495057;
  border: 1px solid #ced4da;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  transition: border-color 0.2s;
}
</style>
