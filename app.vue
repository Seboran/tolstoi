<script setup lang="ts">
import { ref } from 'vue'
import BalancesFormV2 from './components/v2/BalancesFormV2.vue'
import BalancesForm from './components/BalancesForm.vue'

const modeAvance = ref(false)
</script>

<template>
  <header>
    <h1>Bons comptes bons amis</h1>
  </header>
  <main>
    <label for="mode-avance"
      >mode avancé

      <input type="checkbox" name="mode-avance" v-model="modeAvance" />
    </label>
    <BalancesForm v-if="modeAvance" />
    <BalancesFormV2 v-else />
  </main>
  <footer>
    <a href="https://github.com/Seboran/bons-comptes-bons-amis"> Code github </a>
  </footer>
</template>

<style>
:root {
  --main-bg-color: #f9f9f9; /* Define your CSS variable here */
  --border-radius: 5px;
}

* {
  font-family: 'Arial', sans-serif;
}

body {
  display: flex;
  align-items: center;
  height: 100vh; /* This ensures the main element takes up the full viewport height */
  flex-direction: column;
}

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
