<script setup lang="ts">
defineProps<{ label: string }>()
</script>

<template>
  <input v-on="$attrs" type="button" :value="label" />
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
</style>
