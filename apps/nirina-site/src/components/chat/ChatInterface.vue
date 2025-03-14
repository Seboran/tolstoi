<script setup lang="ts">
import ChatInterfaceTemplate from './ChatInterfaceTemplate.vue'
import { regexMap } from './regexMap'

const { lienDernierArticle } = defineProps<{
  lienDernierArticle: string
}>()

// Gestionnaire des redirections pour le chatbot
async function handleFormSubmit(inputMessage: string) {
  // Si le champ est vide, redirige vers le dernier article
  if (inputMessage.length === 0) {
    document.location.href = lienDernierArticle
    return false
  }

  // Convertir l'entrée utilisateur en minuscules pour éviter les erreurs liées à la casse
  const lowerCaseInput = inputMessage.toLowerCase()

  // Parcourir la map pour trouver la première correspondance
  for (const { pattern, href } of regexMap(lienDernierArticle)) {
    if (pattern.test(lowerCaseInput)) {
      document.location.href = href
      return
    }
  }
}
</script>
<template>
  <ChatInterfaceTemplate @submit="handleFormSubmit" />
</template>
<style scoped>
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.8;
  }
}
.chat-container {
  /* animation: fade-in 0.8s ease-out forwards; */
  /* opacity: 0; */
  border: 1px solid transparent;
  border-image: linear-gradient(
    to bottom right,
    #b827fc 0%,
    #2c90fc 25%,
    #888888 50%,
    #888888 75%,
    #888888 100%
  );
  border-image-slice: 1;
}

.chat-container:after {
  filter: blur(25px);
  transform: translate3d(0, 0, 0);
}

@media (prefers-color-scheme: dark) {
  .chat-container {
    /* animation: fade-in 0.8s ease-out forwards; */
    /* opacity: 0; */
    border: 1px solid transparent;
    border-image: linear-gradient(
      to bottom right,
      #b827fc 0%,
      #2c90fc 25%,
      rgb(15, 23, 42) 50%,
      rgb(15, 23, 42) 75%,
      rgb(15, 23, 42) 100%
    );
    border-image-slice: 1;
  }
}

form {
  opacity: 0.8;
}
form:hover {
  opacity: 1;
}
</style>
