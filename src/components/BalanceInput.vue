<script setup lang="ts">
const balance = defineModel<number>('balance')
const name = defineModel<string>('name')

function updateBalance(event: Event) {
  try {
    balance.value = parseFloat((event.target as HTMLInputElement).value)
  } finally {
    //
  }
}
</script>

<template>
  <div class="balances">
    <input name="Nom de la personne" v-model="name" type="text" />
    <input :value="balance" @change="updateBalance" type="number" name="balance" id="" />
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
</style>
