<script setup lang="ts">
import StyledTextInput from './StyledTextInput.vue'
defineModel<number>('balance')
const name = defineModel<string>('name', { required: true })
</script>

<template>
  <tr class="balances">
    <td>
      <StyledTextInput class="nom-personne" label="Nom" v-model="name" :id="name + 'nom'" />
    </td>
  </tr>
</template>

<style scoped></style>
