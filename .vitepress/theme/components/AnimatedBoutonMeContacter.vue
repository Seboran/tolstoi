<template>
  <Transition appear name="appear">
    <div
      class="bouton text-sm text-gray-500 dark:text-white leading-5"
      :class="{
        shake
      }"
      @click="shakeButton"
    >
      <a class="hover:text-gray-700 dark:hover:text-gray-200" href="/contact"
        >Me contacter →</a
      >
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const shake = ref(false)

const DELAI_AVANT_AGITER_BOUTON_CONTACTER_IN_MS = 5000

const refClickTimeout = ref()

function shakeButton() {
  clearTimeout(refTimeout.value)
  clearTimeout(refClickTimeout.value)
  shake.value = true
  refClickTimeout.value = setTimeout(() => {
    shake.value = false
  }, 820)
}
const refTimeout = ref()
onMounted(() => {
  refTimeout.value = setTimeout(() => {
    shakeButton()
  }, DELAI_AVANT_AGITER_BOUTON_CONTACTER_IN_MS)
})
</script>

<style scoped>
.appear-enter-active,
.appear-leave-active {
  transition: opacity 0.5s ease;
  transition-delay: 0.225s;
}

.appear-enter-from,
.appear-leave-to {
  opacity: 0;
}

.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-2px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(4px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-8px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(8px, 0, 0);
  }
}
</style>
