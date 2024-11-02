<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  (e: "start", value: number): void;
}>();
const numberPlayers = ref(3);
</script>

<template>
  <div>
    <h2>Combien de joueurs ?</h2>
  </div>
  <input type="number" class="form-control" v-model="numberPlayers" />
  <button class="btn btn-primary w-100" @click="emit('start', numberPlayers)">
    Jouer !
  </button>
</template>

<style scoped>
h2 {
  text-align: center;
}
</style>
