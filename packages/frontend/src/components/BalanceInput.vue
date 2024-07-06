<script setup lang="ts">
const balance = defineModel<number>('balance')
</script>

<template>
  <input v-model="balance" type="number" name="balance" id="" />
</template>
