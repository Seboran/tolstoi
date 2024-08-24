<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h1>Bons comptes bons amis</h1>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  margin: auto;
  text-align: center;
}
</style>
