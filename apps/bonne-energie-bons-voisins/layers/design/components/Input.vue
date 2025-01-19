<script setup lang="ts">
defineProps<{
  label: string
  id: string
}>()
</script>

<template>
  <div class="relative mx-0.5 my-1">
    <slot></slot>
    <label
      :for="id"
      class="absolute left-1 top-[-0.5rem] z-10 bg-white text-xs dark:bg-[#1c1b22]"
      >{{ label }}</label
    >
  </div>
</template>
