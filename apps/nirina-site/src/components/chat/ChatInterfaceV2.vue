<script setup lang="ts">
import { ref } from 'vue'
import ChatInterfaceTemplate from './ChatInterfaceTemplate.vue'

const { lienDernierArticle } = defineProps<{
  lienDernierArticle: string
}>()

const message = ref('')

const mistralAnswer = ref('')

const lienVersSuite = ref('')

// Function to handle real-time SSE updates
async function fetchMistralResponse(inputMessage: string) {
  mistralAnswer.value = ''
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: inputMessage }),
    })

    if (!response.body) {
      console.error('No response body from the SSE endpoint')
      mistralAnswer.value =
        "Mon chatbot a un peu du mal 💀. N'hésitez pas à naviguer via le menu en haut !"
      return
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let done = false

    while (!done) {
      const { value, done: readerDone } = await reader.read()
      done = readerDone
      if (value) {
        mistralAnswer.value += decoder.decode(value)
      }
    }
  } catch (error) {
    console.error('Error while fetching Mistral AI response:', error)
    mistralAnswer.value =
      "Mon chatbot a un peu du mal 💀. N'hésitez pas à naviguer via le menu en haut !"
  }
}

// Gestionnaire des redirections pour le chatbot
async function handleFormSubmit(inputMessage: string) {
  // Si le champ est vide, redirige vers le dernier article
  if (inputMessage.length === 0) {
    document.location.href = lienDernierArticle
    return false
  }

  await fetchMistralResponse(inputMessage)

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
      pattern:
        /questions?|poser une question|faq|réponses?|demandes?|besoin d'aide/,
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
      pattern:
        /parler de toi|présentation|présenter|bio|à propos|cv|parcours|expérience|histoire/,
      href: '/a-propos',
    },

    // Questions liées aux projets ou portefolio
    {
      pattern:
        /projets?|portfolio|travail|réalisations?|mes créations?|mes travaux?/,
      href: '/projets',
    },

    // Recherche ou navigation libre
    {
      pattern:
        /recherche|explorer|balade|je me balade|naviguer|exploration|parcourir|curiosité/,
      href: '/projets',
    },

    // Sujets liés au blog ou conférences
    {
      pattern:
        /sujets?|thèmes?|articles spécifiques|catégories?|intérêts?|centres d'intérêt/,
      href: '/presentations',
    },

    // Par défaut, redirige vers le blog si rien ne correspond
    { pattern: /.*/, href: '/blog' },
  ]

  // Récupérer le résultat de mistral et le mettre dans la ref mistralAnswer

  // Parcourir la map pour trouver la première correspondance
  for (const { pattern, href } of regexMap) {
    if (pattern.test(lowerCaseInput)) {
      lienVersSuite.value = href
      return
    }
  }
}
</script>
<template>
  <ChatInterfaceTemplate @submit="handleFormSubmit">
    <div v-if="mistralAnswer">
      <div class="chat-output py-4 text-black dark:text-white">
        <p v-if="mistralAnswer">
          <strong>Réponse:</strong> {{ mistralAnswer }}
        </p>
      </div>

      <a
        v-if="lienVersSuite"
        :href="lienVersSuite"
        class="chat-output py-4 text-black dark:text-white"
      >
        Continuer vers {{ lienVersSuite }}</a
      >
    </div>
  </ChatInterfaceTemplate>
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

/* .funny-background {
    filter: blur(50px);
    opacity: 0.2;
    background: linear-gradient(
      90deg,
      rgba(255, 0, 0, 1) 0%,
      rgba(255, 154, 0, 1) 10%,
      rgba(208, 222, 33, 1) 20%,
      rgba(79, 220, 74, 1) 30%,
      rgba(63, 218, 216, 1) 40%,
      rgba(47, 201, 226, 1) 50%,
      rgba(28, 127, 238, 1) 60%,
      rgba(95, 21, 242, 1) 70%,
      rgba(186, 12, 248, 1) 80%,
      rgba(251, 7, 217, 1) 90%,
      rgba(255, 0, 0, 1) 100%
    );
  } */
</style>
