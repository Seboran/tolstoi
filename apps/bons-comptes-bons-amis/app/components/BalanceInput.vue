<script setup lang="ts">
const name = defineModel<string>('name', { required: true })
</script>

<template>
  <StyledTextInput class="my-2" label="Nom" v-model="name" :id="name + 'nom'" />
</template>

<style scoped></style>
