<script setup lang="ts">
defineEmits<{
  click: []
}>()

defineProps<{
  showErrorMessage: boolean
  label: string
}>()
</script>

<template>
  <StyledButton class="w-full" :label @click="$emit('click')"></StyledButton>
  <p v-if="showErrorMessage" class="text-sm text-red-500">
    <slot name="error-message"></slot>
  </p>
</template>
