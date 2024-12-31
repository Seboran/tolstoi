<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string
    id: string
    disabled?: boolean
  }>(),
  {
    disabled: false,
  },
)
const balance = defineModel<number>({ required: true })
</script>

<template>
  <Input :id :label>
    <UInput class="w-full" :name="label" :id :disabled="disabled" type="number" v-model="balance" />
  </Input>
</template>
