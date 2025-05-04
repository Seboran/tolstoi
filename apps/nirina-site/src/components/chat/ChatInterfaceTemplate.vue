<script setup lang="ts">
import { ref } from 'vue'
import BoutonSuggestionChat from './BoutonSuggestionChat.vue'
import EnvoyerButton from './items/EnvoyerButton.vue'

const pauseEntreMots = 120

const message = ref('')

const props = withDefaults(defineProps<{ loading?: boolean }>(), {
  loading: false,
})

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
  if (props.loading) {
    return
  }
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
      @submit.prevent="handleFormSubmit">
      <div class="flex w-full flex-row">
        <textarea
          class="h-16 w-full resize-none border-none bg-transparent outline-hidden placeholder:text-slate-400/75 dark:placeholder:text-slate-100/75"
          placeholder="Par exemple : Je voudrais lire le dernier article de blog." autofocus v-model="message"
          @keypress="submitOnEnter"></textarea>
        <EnvoyerButton :loading />
      </div>

      <slot />
    </form>

    <div class="flex flex-row flex-wrap justify-center gap-2 pt-5">
        <slot name="suggestions">
            <BoutonSuggestionChat @click="handleClickOnSuggestion">
                Peux-tu montrer tous tes articles ?
            </BoutonSuggestionChat>
            <BoutonSuggestionChat @click="handleClickOnSuggestion">Je voudrais prendre contact</BoutonSuggestionChat>
            <BoutonSuggestionChat @click="handleClickOnSuggestion">Peux-tu te présenter ?</BoutonSuggestionChat>
        </slot>
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
  border-image: linear-gradient(to bottom right,
      #b827fc 0%,
      #2c90fc 25%,
      #888888 50%,
      #888888 75%,
      #888888 100%);
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
    border-image: linear-gradient(to bottom right,
        #b827fc 0%,
        #2c90fc 25%,
        rgb(15, 23, 42) 50%,
        rgb(15, 23, 42) 75%,
        rgb(15, 23, 42) 100%);
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
