<script setup lang="ts">
import DisplayWordsCanvas from './words-entry/DisplayWordsCanvas.vue'
import ListWordsTextArea from './words-entry/ListWordsTextArea.vue'

import { ref } from 'vue'

const words = ref<string[]>(['courage', 'désespoir', 'tristesse'])
</script>

<template>
  <ListWordsTextArea v-model="words" />
  <DisplayWordsCanvas :words />
</template>
