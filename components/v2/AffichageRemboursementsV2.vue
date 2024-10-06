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

const columns = [
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
  <UTable aria-label="Remboursements" title="Remboursements" :columns :rows />
</template>
