<script setup lang="ts">
import StyledTextInput from './StyledTextInput.vue'
import StyledNumberInput from './StyledNumberInput.vue'
const balance = defineModel<number>('balance')
const name = defineModel<string>('name', { required: true })
</script>

<template>
  <tr class="balances">
    <td>
      <div style="width: 80%">
        <StyledTextInput class="nom-personne" label="Nom" v-model="name" :id="name + 'nom'" />
      </div>
    </td>
  </tr>
</template>

<style scoped>
input {
  flex: 1;
}
</style>
