<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  matriceDeRemboursements: number[][]
  nomsBalances: string[]
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
      .filter(({ combien }) => combien > 0)
  })
})

type KeysRemboursements = 'qui' | 'combien' | 'àQui'

const columns: { key: KeysRemboursements; label: string }[] = [
  {
    key: 'qui',
    label: 'qui'
  },
  {
    key: 'combien',
    label: 'doit'
  },
  {
    key: 'àQui',
    label: 'à qui'
  }
]

const rows = computed(() => {
  return lignesRemboursement.value.map(({ qui, combien, àQui }) => {
    return {
      id: qui + àQui,
      qui: props.nomsBalances[qui],
      àQui: props.nomsBalances[àQui],
      combien: combien + '€'
    }
  })
})
</script>

<template>
  <table title="Remboursements" aria-label="Remboursements" class="min-w-80">
    <thead>
      <tr>
        <th v-for="(column, index) in columns" :key="index">{{ column.label }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in rows" :key="index">
        <td v-for="(column, i) in columns" :key="i">{{ row[column.key] }}</td>
      </tr>
    </tbody>
  </table>
</template>
