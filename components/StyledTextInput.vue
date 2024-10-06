<script setup lang="ts">
defineProps<{
  label: string | undefined
  id: string
}>()

const name = defineModel<string>({ required: true })
</script>

<template>
  <UInput class="m-w-20" :name :label :id type="text" v-model="name" />
</template>
