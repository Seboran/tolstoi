<script setup lang="ts">
import ChatInterfaceTemplate from './ChatInterfaceTemplate.vue'

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

  // Expressions régulières pour matcher différents types de requêtes
  const regexMap = [
    // Demander le dernier article ou les nouveautés
    {
      pattern: /dernier|récents?|latest|nouveau|nouveautés|actualités/,
      href: lienDernierArticle,
    },

    // Accéder à tous les articles ou au blog
    { pattern: /articles?|blog|posts?|contenus?/, href: '/blog' },

    // Demande de contact, email ou prise de contact
    {
      pattern:
        /contact|email|e-mail|appel|message|joindre|écris-moi|me contacter|envoyer un message|me trouver/,
      href: '/contact',
    },

    // Questions générales
    {
      pattern: /questions?|poser une question|faq|réponses?|demandes?|besoin d'aide/,
      href: '/a-propos',
    },

    // Conférences, présentations ou balades (événements, activités)
    {
      pattern:
        /présentations?|conférences?|balades?|événements?|talks?|meetups?|ateliers?|workshops?/,
      href: '/presentations',
    },

    // À propos de vous, bio, CV ou parcours
    {
      pattern: /parler de toi|présentation|présenter|bio|à propos|cv|parcours|expérience|histoire/,
      href: '/a-propos',
    },

    // Questions liées aux projets ou portefolio
    {
      pattern: /projets?|portfolio|travail|réalisations?|mes créations?|mes travaux?/,
      href: '/projets',
    },

    // Recherche ou navigation libre
    {
      pattern: /recherche|explorer|balade|je me balade|naviguer|exploration|parcourir|curiosité/,
      href: '/projets',
    },

    // Sujets liés au blog ou conférences
    {
      pattern: /sujets?|thèmes?|articles spécifiques|catégories?|intérêts?|centres d'intérêt/,
      href: '/presentations',
    },

    // À propos de mon chat
    {
      pattern: /peppers?|chat(?!bot)|animal|animaux/,
      href: '/chat',
    },

    // Par défaut, redirige vers le blog si rien ne correspond
    { pattern: /.*/, href: '/blog' },
  ]

  // Parcourir la map pour trouver la première correspondance
  for (const { pattern, href } of regexMap) {
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
