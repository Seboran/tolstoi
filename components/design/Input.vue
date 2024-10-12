<script setup lang="ts">
defineProps<{
  label: string
  id: string
}>()
</script>

<template>
  <div class="relative my-1 mx-0.5">
    <slot></slot>
    <label
      :for="id"
      class="absolute z-10 top-[-0.5rem] left-1 text-xs bg-white dark:bg-transparent"
      >{{ label }}</label
    >
  </div>
</template>
