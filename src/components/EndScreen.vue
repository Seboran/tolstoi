<script setup lang="ts">
const emits = defineEmits<{ (e: "replay"): void }>();
</script>

<template>
  <h1>Débattez !</h1>
  <button @click="emits('replay')">Rejouer ?</button>
</template>
