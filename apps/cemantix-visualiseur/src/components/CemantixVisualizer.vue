<script setup lang="ts">
import { listeMotsInitiale } from './listeMots'
import DisplayWordsCanvas from './words-entry/DisplayWordsCanvas.vue'
import ListWordsTextArea from './words-entry/ListWordsTextArea.vue'

import { ref } from 'vue'

const words = ref<string[]>(listeMotsInitiale)
</script>

<template>
  <div class="relative h-full w-full">
    <ListWordsTextArea v-model="words" />
    <DisplayWordsCanvas :words />
  </div>
</template>
