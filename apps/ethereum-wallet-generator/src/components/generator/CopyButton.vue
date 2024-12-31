<script setup>
import { Tooltip } from 'bootstrap'
import { onMounted, ref } from 'vue'

import { useCopy } from './useCopy.js'
defineProps({
  value: {
    required: true,
    type: String,
  },
  text: {
    required: true,
    type: String,
  },
})

const copyButton = ref(null)

onMounted(() => {
  new Tooltip(copyButton.value)
})
</script>

<template>
  <button
    class="btn btn-secondary"
    ref="copyButton"
    type="button"
    data-toggle="tooltip"
    data-placement="top"
    :title="text"
    :disabled="!value"
    @click.prevent="useCopy(value)"
  >
    <i class="bi bi-clipboard"></i>
  </button>
</template>
