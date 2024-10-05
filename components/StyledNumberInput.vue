<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string
    id: string
    disabled: boolean
  }>(),
  {
    disabled: false
  }
)
const balance = defineModel<number>({ required: true })
</script>

<template>
  <UInput :name="label" :id :disabled type="number" v-model="balance" />
</template>
