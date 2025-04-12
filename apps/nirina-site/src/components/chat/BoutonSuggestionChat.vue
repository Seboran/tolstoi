<script setup lang="ts">
import { onMounted, ref, useSlots } from 'vue'

defineEmits<{
  click: [message: string]
}>()

const slotText = useSlots()['default']?.().at(0)?.children?.toString() ?? ''

const disabledUntilLoaded = ref(true)

onMounted(() => {
  disabledUntilLoaded.value = false
})
</script>

<template>
  <div
    class="perspective-on-hover text-nowrap rounded-lg border border-slate-100/25 bg-suggestion-chat px-2 py-1 text-xs text-black dark:text-white">
    <button @click="$emit('click', slotText)" :disabled="disabledUntilLoaded">
      <slot />
    </button>
  </div>
</template>

<style scoped>
button {
  opacity: 0.6;
  transition: 0.4s opacity ease;
}

button:hover {
  opacity: 1;
}
</style>
