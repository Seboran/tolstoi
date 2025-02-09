<script setup lang="ts">
defineProps<{
  prefersReducedMotion: boolean
}>()
</script>

<template>
  <Transition 
    :duration="prefersReducedMotion ? 0 : 500"
    appear
    name="slide-down"
  >
    <h1 class="text-2xl md:text-4xl font-bold mb-6">calculateur de <span class="underline">coût</span> d'interruptions</h1>
  </Transition>
</template>

<style scoped>
h1 {
  text-transform: none;
  color: hsl(210, 29%, 24%);
}


.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.5s ease;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

@media (prefers-reduced-motion: reduce) {
  .slide-down-enter-active,
  .slide-down-leave-active {
    transition: none;
  }

  .slide-down-enter-from,
  .slide-down-leave-to {
    transform: none;
  }
}
</style>