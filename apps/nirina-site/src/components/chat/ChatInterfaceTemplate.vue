<script setup lang="ts">
import { ref } from 'vue'
import BoutonSuggestionChat from './BoutonSuggestionChat.vue'

const pauseEntreMots = 120

const message = ref('')

async function waitForDelay(delayMs: number) {
  await new Promise((resolve) => setTimeout(resolve, delayMs))
}

async function handleClickOnSuggestion(texte: string) {
  message.value = ''
  const indexPremierePause = 11
  for (let c of texte.slice(0, indexPremierePause)) {
    message.value += c
    await waitForDelay(10)
  }
  await waitForDelay(pauseEntreMots)
  const indexDeuxiemePause = 35

  for (let c of texte.slice(indexPremierePause, indexDeuxiemePause)) {
    message.value += c
    await waitForDelay(10)
  }

  await waitForDelay(pauseEntreMots)

  for (let c of texte.slice(indexDeuxiemePause, texte.length)) {
    message.value += c
    await waitForDelay(10)
  }

  await waitForDelay(800)

  await handleFormSubmit()
}

const emit = defineEmits<{ submit: [message: string] }>()

// Gestionnaire des redirections pour le chatbot
async function handleFormSubmit() {
  const inputMessage = message.value.trim()
  emit('submit', inputMessage)
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
      class="big-perspective-on-hover chat-container relative top-0 m-auto grid max-w-lg columns-1 flex-row gap-3 bg-form p-4 text-black dark:text-white"
      @submit.prevent="handleFormSubmit"
    >
      <div class="flex w-full flex-row">
        <textarea
          class="h-16 w-full resize-none border-none bg-transparent outline-hidden placeholder:text-slate-400/75 dark:placeholder:text-slate-100/75"
          placeholder="Par exemple : Je voudrais lire le dernier article de blog."
          autofocus
          v-model="message"
          @keypress="submitOnEnter"
        ></textarea>
        <button
          class="h-8 w-8 rounded-xs bg-send-message p-2 hover:bg-send-message-hover"
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

      <slot />
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
  transition: all 0.5s ease;
}
form:hover {
  opacity: 1;
}
</style>
