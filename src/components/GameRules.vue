<script setup lang="ts">
const emit = defineEmits<{
  (e: "quit"): void;
}>();
</script>

<template>
  Blblablabla Règles
  <button @click="emit('quit')">OK !</button>
</template>
