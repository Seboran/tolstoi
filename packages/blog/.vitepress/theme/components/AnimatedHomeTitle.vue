<script setup lang="ts">
import { useData } from 'vitepress'
import { useMouse } from '@vueuse/core'
import { computed } from 'vue'

const { frontmatter } = useData()

const { x, y } = useMouse()
const RATIO_RALENTIR_BACKGROUND_POSITION_X = 4.0
const RATIO_RALENTIR_BACKGROUND_POSITION_Y = 0.01
const cssBackgroundPosition = computed(
  () =>
    `${Math.trunc(
      x.value / RATIO_RALENTIR_BACKGROUND_POSITION_X
    )}% ${Math.trunc(y.value / RATIO_RALENTIR_BACKGROUND_POSITION_Y)}%`
)
</script>

<template>
  <h1
    class="rainbow-animation text-3xl leading-9 font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14"
    :style="{
      backgroundPosition: cssBackgroundPosition
    }"
  >
    {{ frontmatter.title }}
  </h1>
</template>

<style scoped>
.rainbow-animation:hover {
  background: linear-gradient(
      217deg,
      rgba(255, 0, 0, 0.8),
      rgba(255, 0, 0, 0) 70.71%,
      rgba(255, 0, 0, 0.8)
    ),
    linear-gradient(
      127deg,
      rgba(0, 255, 0, 0.8),
      rgba(0, 255, 0, 0) 70.71%,
      rgba(0, 255, 0, 0.8)
    ),
    linear-gradient(
      336deg,
      rgba(0, 0, 255, 0.8),
      rgba(0, 0, 255, 0) 70.71%,
      rgba(0, 0, 255, 0.8)
    );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  /* animation: rainbow_animation 6s ease-in-out infinite; */
  transition: 1s all ease-in-out;
  background-size: 400% 100%;
}

@keyframes rainbow_animation {
  0%,
  100% {
    background-position: 0 0;
  }

  50% {
    background-position: 100% 0;
  }
}
</style>
