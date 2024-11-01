<script setup lang="ts">
defineProps<{ msg: string; show: boolean }>();
</script>

<template>
  <div class="hidden card">
    <h2 v-show="show">{{ msg }}</h2>
  </div>
</template>

<style scoped>
.hidden {
  min-height: 200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
