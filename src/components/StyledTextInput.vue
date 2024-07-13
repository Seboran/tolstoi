<script setup lang="ts">
defineProps<{
  label: string | undefined
  id: string
}>()

const name = defineModel<string>({ required: true })
</script>

<template>
  <div>
    <label :for="id">{{ label }}</label>
    <input :label :id v-model="name" type="text" />
  </div>
</template>

<style scoped>
label {
  font-size: small;
}
div {
  display: flex;
  flex-direction: column;
}
input {
  background-color: #f8f9fa;
  color: #495057;
  border: 1px solid #ced4da;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  transition: border-color 0.2s;
}
</style>
