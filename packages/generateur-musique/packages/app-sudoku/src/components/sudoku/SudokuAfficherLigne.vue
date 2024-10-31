<template>
  <tr
    class="border-blue-300 [&:nth-child(3n+0)]:border-b-4 [&:nth-child(3n+1)]:border-t-4"
  >
    <SudokuAfficherCellule
      v-for="(cellule, index) in modelValue"
      :key="index"
      v-model="modelValue[index]"
      :possibilites="possibilites[index]"
    />
  </tr>
</template>

<script setup lang="ts">
import { type SudokuCellule, type SudokuPossibilitesCellule } from 'lib-sudoku'
import SudokuAfficherCellule from './SudokuAfficherCellule.vue'

defineProps<{
  possibilites: SudokuCellule[][]
  modelValue: SudokuCellule[]
}>()

defineEmits<{
  'update:modelValue': [value: SudokuCellule[]]
}>()
</script>

<style scoped></style>
