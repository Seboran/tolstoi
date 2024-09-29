<script setup lang="ts">
import { useMouse, useResizeObserver } from '@vueuse/core'
import { computed, reactive, useTemplateRef } from 'vue'

const { x, y } = useMouse()
const refLienZenika = useTemplateRef('lien-zenika')
const positionLien = reactive({ x: 0, y: 0 })

useResizeObserver(document.body, () => {
  const boundingClient = refLienZenika.value?.getBoundingClientRect()

  if (!boundingClient) {
    return undefined
  }
  const { x, y } = boundingClient
  positionLien.x = x
  positionLien.y = y
})

const distance = computed(() => {
  if (!positionLien) {
    return undefined
  }
  return Math.abs(positionLien.x - x.value) + Math.abs(positionLien.y - y.value)
})

const MINIMUM_FONT_WEIGHT = 500.0
const COEFFICIENT_FONT_WEIGHT = 800
const CONVERSION_FONT_WEIGHT = 125.0
const fontWeight = computed(() => {
  if (!distance.value) {
    return 0
  }
  return Math.max(
    Math.tanh(Math.abs(1.0 / distance.value) * CONVERSION_FONT_WEIGHT) *
      COEFFICIENT_FONT_WEIGHT,
    MINIMUM_FONT_WEIGHT
  )
})
</script>

<template>
  <a
    ref="lien-zenika"
    class="text-gray-900 dark:text-white"
    :style="{
      fontWeight
    }"
    href="https://www.linkedin.com/company/zenika/mycompany/verification/"
    target="_blank"
    >Zenika</a
  >
</template>

<style scoped>
a {
  transition: 0.05s all ease;
}
</style>
