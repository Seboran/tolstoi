<script setup lang="ts">
defineProps<{
  historiqueDépenses: {
    indexDépenseur: number
    montant: number
    listeIndexesBénéficiares: number[]
  }[]
  nomsBalances: string[]
}>()
</script>

<template>
  <ul>
    <li
      v-for="({ indexDépenseur, listeIndexesBénéficiares, montant }, index) in historiqueDépenses"
      :key="index"
    >
      {{ nomsBalances[indexDépenseur] }}
      a dépensé
      {{ montant }}€ pour
      {{ listeIndexesBénéficiares.map((index) => nomsBalances[index]).join(', ') }}
    </li>
  </ul>
</template>

<style scoped></style>
