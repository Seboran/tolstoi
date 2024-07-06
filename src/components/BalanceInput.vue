<script setup lang="ts">
const balance = defineModel<number>('balance')

function updateBalance(event: Event) {
  try {
    balance.value = parseFloat((event.target as HTMLInputElement).value)
  } finally {
    //
  }
}
</script>

<template>
  <input :value="balance" @change="updateBalance" type="number" name="balance" id="" />
</template>
