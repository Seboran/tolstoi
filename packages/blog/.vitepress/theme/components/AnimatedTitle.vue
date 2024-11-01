<template>
  <a class="text-xl" href="/" aria-label="Site de Nirina Rabeson">
    ✨
    <span
      v-if="!show"
      class="rainbow-animation hidden md:inline dark:text-white"
      >Nirina Rabeson</span
    >
  </a>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean
}>()
</script>
