<script setup lang="ts">
import { ref } from 'vue'
import BalancesFormV2 from './components/v2/BalancesFormV2.vue'
import BalancesForm from './components/BalancesForm.vue'

const modeAvance = ref(false)
</script>

<template>
  <header class="m-auto text-center">
    <h1>Bons comptes bons amis</h1>
  </header>
  <main class="min-h-[80vh] flex justify-between items-center flex-col">
    <div>
      <UCheckbox v-model="modeAvance" label="Mode avancé" />
      <BalancesForm v-if="modeAvance" />
      <BalancesFormV2 v-else />
    </div>
    <footer class="relative justify-self-stretch text-right bottom-0">
      <ULink
        active-class="text-primary"
        inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        to="https://github.com/Seboran/bons-comptes-bons-amis"
      >
        Code github
      </ULink>
    </footer>
  </main>
</template>

<style>
:root {
  --main-bg-color: #f9f9f9; /* Define your CSS variable here */
  --border-radius: 5px;
}

* {
  font-family: 'Arial', sans-serif;
}
</style>
