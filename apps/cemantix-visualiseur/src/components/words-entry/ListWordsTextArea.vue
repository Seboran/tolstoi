<template>
  <div class="absolute top-0 left-0">
    <textarea autofocus v-model="textareaValue" class="h-96" />
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
