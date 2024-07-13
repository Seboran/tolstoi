<script setup lang="ts">
import StyledTextInput from './StyledTextInput.vue'
import StyledNumberInput from './StyledNumberInput.vue'
const balance = defineModel<number>('balance')
const name = defineModel<string>('name', { required: true })
</script>

<template>
  <div class="balances">
    <StyledTextInput
      class="nom-personne"
      :label="'Modifier le nom de ' + name"
      v-model="name"
      :id="name + 'nom'"
    />
    <StyledNumberInput v-model="balance" :label="'balance de ' + name" :id="name + 'nombre'" />
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
