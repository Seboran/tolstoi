<script setup lang="ts">
import { ref } from 'vue'
import BalancesFormV2 from '@/components/v2/BalancesFormV2.vue'
import BalancesForm from '@/components/BalancesForm.vue'

const modeAvance = ref(false)
</script>

<template>
  <main class="flex flex-col p-8">
    <header class="m-auto text-center">
      <h1
        class="text-3xl leading-9 font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14"
      >
        Bons comptes bons amis
      </h1>
    </header>
    <UCheckbox class="self-end" v-model="modeAvance" label="Mode avancé" />
    <BalancesForm v-if="modeAvance" />
    <BalancesFormV2 v-else />
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
