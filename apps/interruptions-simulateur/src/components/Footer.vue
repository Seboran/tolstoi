<script setup lang="ts">
defineProps<{
  prefersReducedMotion: boolean
}>()
</script>

<template>
  <Transition 
    :duration="prefersReducedMotion ? 0 : 500"
    appear
    name="fade"
  >
    <p class="footer-text">
      Suivez vos interruptions pour mesurer leur impact sur votre productivité
    </p>
  </Transition>
</template>

<style scoped>
.footer-text {
  margin-top: 2rem;
  color: #666;
  font-style: italic;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .fade-enter-active,
  .fade-leave-active {
    transition: none;
  }
}
</style>