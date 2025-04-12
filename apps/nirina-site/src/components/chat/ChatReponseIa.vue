<script setup lang="ts">
defineProps<{
  loading: boolean
  reponse: string
}>()
</script>

<template>
  <div class="text-black dark:text-white">
    <p>
      {{ reponse }}
    </p>
  </div>
</template>
