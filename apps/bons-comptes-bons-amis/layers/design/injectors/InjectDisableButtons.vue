<script setup lang="ts">
import { disableButtons } from '../injectSymbols/disableSymbol'

const props = defineProps<{
  value?: boolean
}>()
const { value } = toRefs(props)
provide(disableButtons, value)
</script>

<template><slot /></template>
