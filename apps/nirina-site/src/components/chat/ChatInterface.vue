<script setup lang="ts">
import { ref } from 'vue'
import BoutonSuggestionChat from './BoutonSuggestionChat.vue'

const pauseEntreMots = 300

const { lienDernierArticle } = defineProps<{
  lienDernierArticle: string
}>()

const message = ref('')

async function waitForDelay(delayMs: number) {
  await new Promise((resolve) => setTimeout(resolve, delayMs))
}

async function handleClickOnSuggestion(texte: string) {
  message.value = ''
  const indexPremierePause = 11
  for (let c of texte.slice(0, indexPremierePause)) {
    message.value += c
    await waitForDelay(20)
  }
  await waitForDelay(pauseEntreMots)
  const indexDeuxiemePause = 35

  for (let c of texte.slice(indexPremierePause, indexDeuxiemePause)) {
    message.value += c
    await waitForDelay(20)
  }

  await waitForDelay(pauseEntreMots)

  for (let c of texte.slice(indexDeuxiemePause, texte.length)) {
    message.value += c
    await waitForDelay(20)
  }

  await waitForDelay(800)

  await handleFormSubmit()
}

// Gestionnaire des redirections pour le chatbot
async function handleFormSubmit() {
  const inputMessage = message.value.trim()

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

  // Parcourir la map pour trouver la première correspondance
  for (const { pattern, href } of regexMap) {
    if (pattern.test(lowerCaseInput)) {
      document.location.href = href
      return
    }
  }
}

function submitOnEnter(key: KeyboardEvent) {
  if (key.key === 'Enter' && !key.shiftKey) {
    key.stopPropagation()
    key.preventDefault()
    handleFormSubmit()
  }
}
</script>
<template>
  <div>
    <div class="funny-background absolute h-24 w-full max-w-lg"></div>

    <form
      class="big-perspective-on-hover chat-container relative top-0 m-auto flex max-w-lg flex-row gap-3 bg-slate-100 p-4 text-black dark:bg-slate-700 dark:text-white"
      @submit.prevent="handleFormSubmit"
    >
      <textarea
        class="h-16 w-full resize-none border-none bg-transparent outline-none placeholder:text-slate-400/75 dark:placeholder:text-slate-100/75"
        placeholder="Par exemple : Je voudrais lire le dernier article de blog."
        autofocus
        v-model="message"
        @keypress="submitOnEnter"
      ></textarea>
      <div class="flex flex-col">
        <button
          class="h-8 w-8 rounded-sm bg-blue-500 p-2 hover:bg-blue-400"
          name="Envoyer message"
          aria-label="Envoyer message"
          type="submit"
        >
          <svg
            viewBox="0 0 24 24"
            class="text-white"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z"
              fill="#FFFFFF"
            ></path>
          </svg>
        </button>
      </div>
    </form>

    <div class="flex flex-row flex-wrap justify-center gap-2 pt-5">
      <BoutonSuggestionChat @click="handleClickOnSuggestion">
        Je voudrais lire le dernier article de blog
      </BoutonSuggestionChat>
      <BoutonSuggestionChat @click="handleClickOnSuggestion">
        Peux-tu montrer tous tes articles ?
      </BoutonSuggestionChat>
      <BoutonSuggestionChat @click="handleClickOnSuggestion"
        >Je voudrais prendre contact</BoutonSuggestionChat
      >
      <BoutonSuggestionChat @click="handleClickOnSuggestion"
        >Je me balade juste</BoutonSuggestionChat
      >

      <BoutonSuggestionChat @click="handleClickOnSuggestion"
        >Peux-tu te présenter ?</BoutonSuggestionChat
      >
    </div>
  </div>
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
