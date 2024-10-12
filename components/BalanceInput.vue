<script setup lang="ts">
import StyledTextInput from './StyledTextInput.vue'
defineModel<number>('balance')
const name = defineModel<string>('name', { required: true })
</script>

<template>
  <StyledTextInput class="my-2" label="Nom" v-model="name" :id="name + 'nom'" />
</template>

<style scoped></style>
