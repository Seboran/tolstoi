<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import themes from "./themes.json";
import ShowThemeButton from "./ShowThemeButton.vue";

const props = defineProps<{
  numberPlayers: number;
}>();
const emits = defineEmits<{
  (e: "quit"): void;
}>();

const playerIndex = ref<number>(0);
const randomPlayer = ref<number>(0);
const show = ref(false);
const theme = themes[Math.floor(Math.random() * themes.length)];

function getRandomInt(): number {
  return Math.floor(Math.random() * props.numberPlayers);
}

const displayedMessage = computed<string>(() =>
  playerIndex.value !== randomPlayer.value ? theme : "tu ne sais pas"
);

const nextPlayerMessage = computed<string>(() =>
  playerIndex.value === props.numberPlayers - 1
    ? "Terminer"
    : "Donner au joueur suivant"
);

function nextPlayer() {
  if (playerIndex.value < props.numberPlayers - 1) {
    playerIndex.value++;
    show.value = false;
  } else {
    emits("quit");
  }
}

function showTheme() {
  show.value = true;
}

function onClick() {
  if (show.value) {
    nextPlayer();
  } else {
    showTheme();
  }
}

onMounted(() => (randomPlayer.value = getRandomInt()));
</script>

<template>
  <h2>Le thème est</h2>
  <ShowThemeButton :msg="displayedMessage" v-model:show="show" />

  <button class="btn btn-primary w-100" @click="onClick">
    {{ !show ? "Révéler" : nextPlayerMessage }}
  </button>
</template>
