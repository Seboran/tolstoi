<script setup lang="ts">
import ChatInterfaceTemplate from './ChatInterfaceTemplate.vue'
import ChatReponseIa from './ChatReponseIa.vue'
import { useMistralChat } from './useMistralChat'

const { lienDernierArticle } = defineProps<{
  lienDernierArticle: string
}>()

const { mistralAnswer, lienVersSuite, suggestedLinks, bloquerSubmitDoublon, handleFormSubmit } =
  useMistralChat(lienDernierArticle)
</script>

<template>
  <ChatInterfaceTemplate :loading="bloquerSubmitDoublon" @submit="handleFormSubmit">
    <div>
      <ChatReponseIa :loading="bloquerSubmitDoublon" :reponse="mistralAnswer" />

      <!-- Show a single recommended link -->
      <a v-if="lienVersSuite" :href="lienVersSuite"
        class="text-blue-800 hover:text-gray-800 dark:text-blue-200 dark:hover:text-gray-200">
        <div class="my-1 py-1">
          <button type="button" class="button-levitation">
            Continuer vers {{ lienVersSuite }}
          </button>
        </div>
      </a>

      <!-- Show multiple suggested links if available -->
      <div v-if="suggestedLinks.length > 1" class="mt-4">
        <p class="font-medium mb-2">Liens suggérés :</p>
        <div class="flex flex-wrap gap-2">
          <a v-for="(link, index) in suggestedLinks" :key="index" :href="link"
            class="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
            {{ link }}
          </a>
        </div>
      </div>
    </div>
  </ChatInterfaceTemplate>
</template>

<style>
@keyframes levitation {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-1px);
  }
}

.button-levitation {
  animation: levitation 3s infinite ease-in-out;
  transition: all 0.3s ease;
}

/* Simple spinner animation */
.spinner {
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 2px solid #2c90fc;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@media (prefers-color-scheme: dark) {
  .spinner {
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-top: 2px solid #2c90fc;
  }
}
</style>
