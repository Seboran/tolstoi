<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  (e: "start", value: number): void;
  (e: "rules"): void;
}>();
const numberPlayers = ref(3);
</script>

<template>
  <div>
    <button @click="emit('rules')">Règles</button>
    <h1>Nombre de joueurs ?</h1>
    <input v-model="numberPlayers" />
    <button @click="emit('start', numberPlayers)">Jouer</button>
  </div>
</template>
