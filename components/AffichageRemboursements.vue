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
      .filter(({ combien }) => combien < 0)
  })
})
</script>

<template>
  <table title="Remboursements">
    <thead>
      <tr>
        <th>qui</th>
        <th>doit</th>
        <th>à qui</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="({ qui, combien, àQui }, _index) in lignesRemboursement" :key="_index">
        <tr>
          <td>{{ nomsBalances[qui] }}</td>
          <td>{{ -combien }}€</td>
          <td>{{ nomsBalances[àQui] }}</td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<style scoped>
table {
  width: 100%;
  min-width: 300px;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  text-align: left;
}

th:first-child {
  border-top-left-radius: var(--border-radius);
}
th:last-child {
  border-top-right-radius: var(--border-radius);
}

tr:last-child td:first-child {
  border-bottom-left-radius: var(--border-radius);
}

tr:last-child td:last-child {
  border-bottom-right-radius: var(--border-radius);
}

tr:not(:last-child) {
  border-bottom: 1px solid rgb(230, 230, 230);
}

thead {
  background-color: var(--main-bg-color);
}
</style>
