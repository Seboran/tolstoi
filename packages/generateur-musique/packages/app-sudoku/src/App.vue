<template>
  <AppLayout>
    <div>
      <div>
        <SudokuAfficherGrille
          v-model:grid="sudoku.contexte"
          :possibilites="
            arrayToGrid(sudoku.valeurs.map(({ solutions }) => solutions))
          "
        />
      </div>
      <StyledBouton @click="propager"> RÉSOUDRE ! </StyledBouton>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import 'lib-style/dist/style.css'

import AppLayout from '@/components/AppLayout.vue'
import { useSudokuGrid } from '@/composables/useSudokuGrid'
import { StyledBouton } from 'lib-style'
import SudokuAfficherGrille from './components/sudoku/SudokuAfficherGrille.vue'
const { sudoku, propager } = useSudokuGrid()

function arrayToGrid<T>(list: T[]): T[][] {
  const grid: T[][] = []
  for (let i = 0; i < 9; i++) {
    grid.push(list.slice(i * 9, (i + 1) * 9))
  }
  return grid
}
</script>
