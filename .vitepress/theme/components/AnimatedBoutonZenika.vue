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

const MAX_COLOR_SATURATION = 100.0
const COEFFICIENT_SATURATION = 400
const VITESSE_CHANGEMENT_COULEUR = 40
const saturation = computed(() => {
  if (!distance.value) {
    return 0
  }
  return Math.min(
    Math.tanh(Math.abs(1.0 / distance.value) * VITESSE_CHANGEMENT_COULEUR) *
      COEFFICIENT_SATURATION,
    MAX_COLOR_SATURATION
  )
})
</script>

<template>
  <a
    ref="lien-zenika"
    class="text-gray-900 dark:text-white font-bold"
    :style="{
      color: `color-mix(in oklab, hsl(0, 70%, 35.29%) ${saturation}%, black)`
    }"
    href="https://www.linkedin.com/company/zenika/mycompany/verification/"
    target="_blank"
    >Zenika</a
  >
</template>

<style scoped>
a {
  transition: 0.1s all ease;
}
</style>
