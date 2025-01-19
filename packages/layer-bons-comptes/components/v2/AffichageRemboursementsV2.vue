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
          qui: i,
          combien: montant,
          àQui: index,
        }
      })
      .filter(({ combien }) => combien > 0)
  })
})

type KeysRemboursements = 'qui' | 'combien' | 'àQui'

const columns: { key: KeysRemboursements; label: string }[] = [
  {
    key: 'qui',
    label: 'qui',
  },
  {
    key: 'combien',
    label: 'doit',
  },
  {
    key: 'àQui',
    label: 'à qui',
  },
]

const rows = computed(() => {
  return lignesRemboursement.value.map(({ qui, combien, àQui }) => {
    return {
      id: qui + àQui,
      qui: props.nomsBalances[qui],
      àQui: props.nomsBalances[àQui],
      combien: combien + 'W',
    }
  })
})
</script>

<template>
  <table title="Remboursements" aria-label="Remboursements" class="m-auto w-full min-w-80">
    <thead>
      <tr>
        <th v-for="(column, index) in columns" :key="index">{{ column.label }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.qui + row.àQui">
        <td class="px-2 text-start">
          {{ row.qui }}
        </td>
        <td class="px-2 text-center">
          {{ row.combien }}
        </td>
        <td class="px-2 text-center">
          {{ row.àQui }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
