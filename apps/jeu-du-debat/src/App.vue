<script setup lang="ts">
import { ref } from 'vue'

import StartScreen from './components/StartScreen.vue'
import GameRules from './components/GameRules.vue'
import ShowTheme from './components/ShowTheme.vue'
import EndScreen from './components/EndScreen.vue'

enum GameStates {
  Start,
  Rules,
  Reveal,
  End,
}

const gameState = ref(GameStates.Start)
const numberPlayers = ref(0)

function startGame(value: number) {
  numberPlayers.value = value
  gameState.value = GameStates.Reveal
}

function backMainScreen() {
  gameState.value = GameStates.Start
}

function seeRules() {
  gameState.value = GameStates.Rules
}

function endGame() {
  gameState.value = GameStates.End
}
</script>

<template>
  <button
    v-if="gameState === GameStates.Start"
    id="rules-button"
    class="btn btn-secondary btn-circle"
    @click="seeRules"
    type="button"
    data-toggle="tooltip"
    data-placement="top"
  >
    Règles du jeu
  </button>
  <main>
    <header>
      <h1>
        🤓<br />
        Le jeu du débat
      </h1>
    </header>
    <div class="card">
      <div class="content card-body">
        <StartScreen v-if="gameState === GameStates.Start" @start="startGame" />
        <GameRules v-if="gameState === GameStates.Rules" @quit="backMainScreen" />
        <ShowTheme
          v-if="gameState === GameStates.Reveal"
          :number-players="numberPlayers"
          @quit="endGame"
        />
        <EndScreen v-if="gameState === GameStates.End" @replay="backMainScreen" />
      </div>
    </div>
  </main>
</template>

<style scoped>
.logo {
  display: block;
  margin: 0 auto 2rem;
}

header {
  text-align: center;
  width: 100%;
}

main {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 400px;
  padding: 10px;
}

.content {
  min-height: 200px !important;
  width: 300px !important;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

#rules-button {
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>
