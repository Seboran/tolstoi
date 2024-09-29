<template>
  <a class="text-xl" href="/" aria-label="Site de Nirina Rabeson">
    ✨
    <Transition name="title-apparaitre">
      <span v-if="!show" class="hidden md:inline dark:text-white"
        >Nirina Rabeson</span
      >
    </Transition>
  </a>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean
}>()
</script>

<style scoped>
.title-apparaitre-enter-active {
  transition: opacity 0.5s ease;
}

.title-apparaitre-enter-from {
  opacity: 0;
}
</style>
