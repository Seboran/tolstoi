<script setup lang="ts">
import BalancesForm from '@/components/BalancesForm.vue'
</script>

<template>
  <main>
    <h1>Bons comptes bons amis</h1>
    <BalancesForm />
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* This ensures the main element takes up the full viewport height */
  flex-direction: column;
}
</style>
