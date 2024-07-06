<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  matriceDeRemboursements: number[][]
}>()

const lignesRemboursement = computed(() => {
  return props.matriceDeRemboursements.flatMap((ligne, index) => {
    return ligne
      .map((montant, i) => {
        return {
          qui: index,
          combien: montant,
          àQui: i
        }
      })
      .filter(({ combien }) => combien < 0)
  })
})
</script>

<template>
  <table>
    <thead>
      <th>Qui</th>
      <th>Combien</th>
      <th>À qui</th>
    </thead>
    <tbody>
      <template v-for="({ qui, combien, àQui }, _index) in lignesRemboursement" :key="_index">
        <tr>
          <td>{{ qui }}</td>
          <td>{{ -combien }}</td>
          <td>{{ àQui }}</td>
        </tr>
      </template>
    </tbody>
  </table>
</template>
