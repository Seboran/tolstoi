<script setup lang="ts">
import StyledTextInput from './StyledTextInput.vue'
import StyledNumberInput from './StyledNumberInput.vue'
const balance = defineModel<number>('balance')
const name = defineModel<string>('name', { required: true })
</script>

<template>
  <tr class="balances">
    <td>
      <StyledTextInput class="nom-personne" label="Nom" v-model="name" :id="name + 'nom'" />
    </td>
    <td>
      <StyledNumberInput v-model="balance" label="balance" :id="name + 'nombre'" disabled />
    </td>
  </tr>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 1rem;
}
input {
  flex: 1;
}

.nom-personne {
  width: 10rem;
}
</style>
