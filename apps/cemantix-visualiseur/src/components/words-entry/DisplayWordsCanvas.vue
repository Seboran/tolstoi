<script setup lang="ts">
import { toRef } from 'vue'
import DisplayOnCanvas from './DisplayOnCanvas.vue'
import { useWordToPosition } from './useWordToPosition'

const { words } = defineProps<{ words: string[] }>()

const { positions } = useWordToPosition(toRef(() => words))
</script>

<template>
  <DisplayOnCanvas :positions />
</template>
