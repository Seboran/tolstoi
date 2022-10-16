<script setup lang="ts">
const emit = defineEmits<{
  (e: "quit"): void;
}>();
</script>

<template>
  <h2>Bienvenu sur le jeu du débat !</h2>
  <p>
    Dans ce jeu, tout le monde doit discuter autour d'un débat, mais une
    personne parmi vous ne connait pas le sujet. <br />
    Pour ceux qui connaissent le sujet, il s'agit de trouver la personne qui ne
    connaît pas le sujet. <br />
    Pour celle qui ne connaît pas le sujet, il faut deviner le sujet. <br />
  </p>
  <button class="btn btn-primary w-100" @click="emit('quit')">OK !</button>
</template>
