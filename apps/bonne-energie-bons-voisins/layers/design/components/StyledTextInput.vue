<script setup lang="ts">
defineProps<{
  label: string | undefined
  id: string
}>()

const name = defineModel<string>({ required: true })
</script>

<template>
  <Input :id label="Nom">
    <UInput class="m-w-20" :name :aria-label="label" :id type="text" v-model="name" />
  </Input>
</template>
