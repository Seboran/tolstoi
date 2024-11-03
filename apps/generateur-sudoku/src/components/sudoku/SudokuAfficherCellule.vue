<template>
  <td
    class="bg-ghost_white m-2 box-border h-10 w-10 border-2 bg-clip-border text-center [&:nth-child(3n+0)]:border-r-4 [&:nth-child(3n+1)]:border-l-4"
  >
    <input
      class="bg-ghost_white box-content h-full w-full bg-clip-border text-center"
      :class="{
        'bg-citrine-900': !!cellule,
      }"
      type="number"
      :disabled="!!cellule"
      name="cellule"
      :value="cellule || ''"
      @input="update"
    />
  </td>
</template>

<script setup lang="ts">
import { type SudokuCellule, type SudokuPossibilitesCellule } from 'lib-sudoku'

import { computed } from 'vue'

const props = defineProps<{
  modelValue: SudokuCellule
  possibilites: SudokuCellule[]
}>()

const emit = defineEmits<{
  'update:modelValue': [SudokuCellule]
}>()

const cellule = computed<SudokuCellule>({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

function update(value: Event) {
  const target = value.target as HTMLInputElement

  const parsedInt = parseInt(target?.value)

  if (props.possibilites.includes(parsedInt)) {
    cellule.value = parsedInt
    return
  }

  cellule.value = 0
}
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
