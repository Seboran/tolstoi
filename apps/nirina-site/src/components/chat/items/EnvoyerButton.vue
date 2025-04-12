<script setup lang="ts">
defineProps<{ loading: boolean }>()
</script>

<template>
  <Transition mode="out-in" name="fade">
    <button v-if="!loading" class="h-8 w-8 rounded-xs bg-send-message p-2 hover:bg-send-message-hover"
      :class="{ 'cursor-not-allowed': loading }" name="Envoyer message" aria-label="Envoyer message" type="submit">
      <svg viewBox="0 0 24 24" class="text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z"
          fill="#FFFFFF"></path>
      </svg>
    </button>
    <template v-else>
      <div class="px-2 pt-1">
        <div class="spinner h-5 w-5"></div>
      </div>
    </template>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
