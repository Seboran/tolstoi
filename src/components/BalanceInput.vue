<script setup lang="ts">
import StyledTextInput from './StyledTextInput.vue'
import StyledNumberInput from './StyledNumberInput.vue'
const balance = defineModel<number>('balance')
const name = defineModel<string>('name')
</script>

<template>
  <div class="balances">
    <StyledTextInput class="nom-personne" label="Nom de la personne" v-model="name" />
    <StyledNumberInput v-model="balance" label="balance" id="" />
  </div>
</template>

<style scoped>
.balances {
  display: flex;
  gap: 1rem;
}
input {
  flex: 1;
}

.nom-personne {
  width: 10rem;
}
</style>
