<script setup lang="ts">
defineProps<{
  label: string | undefined
  id: string
}>()

const name = defineModel<string>({ required: true })
</script>

<template>
  <UInput :name :label :id type="text" v-model="name" />
</template>
