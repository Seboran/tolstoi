<script setup lang="ts">
defineProps<{
  label: string
}>()
const balance = defineModel<string>({ required: true })
</script>

<template>
  <input v-model="balance" type="number" :name="label" id="" />
</template>

<style scoped>
input {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  width: 100%;
}
</style>
