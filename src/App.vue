<script setup lang="ts">
import BalancesFormV2 from './components/v2/BalancesFormV2.vue'
</script>

<template>
  <header>
    <h1>Bons comptes bons amis</h1>
  </header>
  <main>
    <BalancesFormV2 />
  </main>
  <footer>
    <a href="https://github.com/Seboran/bons-comptes-bons-amis"> Code github </a>
  </footer>
</template>

<style scoped>
header {
  margin: auto;
  text-align: center;
}

main {
  min-height: 80vh;
}

footer {
  position: relative;
  right: 20px;
  bottom: 10px;
  text-align: right;
}
</style>
