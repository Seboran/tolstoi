<script setup lang="ts">
defineProps<{
  label: string
  id: string
}>()
const balance = defineModel<number>({ required: true })
</script>

<template>
  <div>
    <label :for="id">{{ label }}</label>
    <input v-model="balance" type="number" :id />
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
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  width: 100%;
}
</style>
