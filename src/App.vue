<script setup lang="ts">
import { ref } from "vue";
import StartScreen from "./components/StartScreen.vue";
import GameRules from "./components/GameRules.vue";
import ShowTheme from "./components/ShowTheme.vue";
import EndScreen from "./components/EndScreen.vue";

enum GameStates {
  Start,
  Rules,
  Reveal,
  End,
}

const gameState = ref(GameStates.Start);
const numberPlayers = ref(0);

function startGame(value: number) {
  numberPlayers.value = value;
  gameState.value = GameStates.Reveal;
}

function backMainScreen() {
  gameState.value = GameStates.Start;
}

function seeRules() {
  gameState.value = GameStates.Rules;
}

function endGame() {
  gameState.value = GameStates.End;
}
</script>

<template>
  <main>
    <StartScreen
      v-if="gameState === GameStates.Start"
      @start="startGame"
      @rules="seeRules"
    />
    <GameRules v-if="gameState === GameStates.Rules" @quit="backMainScreen" />
    <ShowTheme
      v-if="gameState === GameStates.Reveal"
      :number-players="numberPlayers"
      @quit="endGame"
    />
    <EndScreen v-if="gameState === GameStates.End" @replay="backMainScreen" />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

header {
  display: flex;
  place-items: center;
  padding-right: calc(var(--section-gap) / 2);
}

.logo {
  margin: 0 2rem 0 0;
}
</style>
