<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import ShowThemeButton from "./ShowThemeButton.vue";
import { useThemes } from "@/composables/appwrite";

const props = defineProps<{
  numberPlayers: number;
}>();
const emits = defineEmits<{
  (e: "quit"): void;
}>();

const { theme, get } = useThemes();

const playerIndex = ref<number>(0);
const randomPlayer = ref<number>(0);
const show = ref(false);

const displayedMessage = computed<string>(() =>
  playerIndex.value !== randomPlayer.value ? theme.value : "tu ne sais pas",
);

const nextPlayerMessage = computed<string>(() =>
  playerIndex.value === props.numberPlayers - 1
    ? "Terminer"
    : "Donner au joueur suivant",
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

onMounted(async () => {
  await get();
});
</script>

<template>
  <h2>Le thème est</h2>
  <ShowThemeButton :msg="displayedMessage" :show="show" />

  <button class="btn btn-primary w-100" @click="onClick">
    {{ !show ? "Révéler" : nextPlayerMessage }}
  </button>
</template>
