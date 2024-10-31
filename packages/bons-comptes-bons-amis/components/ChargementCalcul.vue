<script setup lang="ts">
defineProps<{
  isLoading: boolean
}>()
</script>

<template>
  <template v-if="isLoading">
    <p>Calcul en cours...</p>
  </template>
</template>
