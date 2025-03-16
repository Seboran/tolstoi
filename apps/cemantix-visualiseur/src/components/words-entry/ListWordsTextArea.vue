<template>
  <div class="top-0 left-0 p-4 w-full max-w-md">
    <textarea 
      autofocus 
      v-model="textareaValue" 
      class="w-full h-48 p-3 rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 shadow-sm transition-all duration-200 font-mono text-base resize-none outline-none"
      placeholder="Enter words, one per line..."
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const words = defineModel<string[]>({ required: true })

const textareaValue = computed({
  get: () => words.value.join('\n'),
  set: (value: string) => {
    words.value = value.split('\n')
  },
})
</script>

<style scoped>
textarea {
  background-color: white;
  color: #333;
  line-height: 1.5;
}

textarea::-webkit-scrollbar {
  width: 8px;
}

textarea::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: #a0a0a0;
}
</style>
