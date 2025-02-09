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
    <h1>calculateur de <span class="underline">coût</span> d'interruptions</h1>
  </Transition>
</template>

<style scoped>
h1 {
  text-transform: none;
  font-size: 3em;
  line-height: 1.1;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.underline {
  border-bottom: 3px solid #764ba2;
  padding-bottom: 2px;
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