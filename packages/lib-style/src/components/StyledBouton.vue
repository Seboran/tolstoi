<template>
  <button
    class="duration-10 bg-citrine-500 hover:bg-citrine-600 active:bg-citrine-700 m-4 transform rounded px-4 py-2 font-bold text-white transition-transform ease-in-out active:translate-x-1 active:translate-y-1"
    type="button"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineEmits<{
  click: []
}>()
</script>

<style scoped></style>
