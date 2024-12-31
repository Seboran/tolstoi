<script setup lang="ts">
const emits = defineEmits<{ (e: 'replay'): void }>()
</script>

<template>
  <div><!-- empty div --></div>
  <h2>Débattez !</h2>
  <button class="btn btn-primary w-100" @click="emits('replay')">Rejouer ?</button>
</template>
