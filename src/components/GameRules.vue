<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  (e: "quit"): void;
}>();
const page1 = ref(false);
</script>

<template>
  <h2>Bienvenu sur le jeu du débat !</h2>
  <p v-if="!page1">
    Dans ce jeu, tout le monde doit discuter autour d'un débat, mais une
    personne parmi vous ne connait pas le sujet. <br />
    Pour celles qui connaissent le sujet, il s'agit de
    <b>trouver la personne qui ne connaît pas le sujet.</b> <br />
    Pour celle qui ne connaît pas le sujet, il faut <b>deviner le sujet</b>.
    <br />
  </p>
  <p v-else>
    Pour jouer à ce jeu, <b>choisissez</b> le nombre de joueurs,
    <b>faites passer</b> le téléphone à chaque joueur à tour de rôle pour
    recevoir le sujet et <b>débattez</b>.
  </p>
  <button
    class="btn btn-primary w-100"
    @click="page1 ? emit('quit') : (page1 = true)"
  >
    {{ page1 ? "OK !" : "Suivant" }}
  </button>
</template>
