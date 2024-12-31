<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'

const value = ref(false)
const unsetValue = useDebounceFn(() => (value.value = false), 3000)
function afficherToaster() {
  value.value = true
  unsetValue()
}

defineExpose({ afficherToaster })
</script>

<template>
  <Teleport to="body">
    <Transition name="slide">
      <div v-if="value" class="fixed right-2 top-2 w-full max-w-80 md:right-5 md:top-5">
        <UAlert color="orange" variant="solid">
          <template #icon> ℹ️ </template>
          <template #description>
            <slot />
          </template>
        </UAlert>
      </div>
    </Transition>
  </Teleport>
</template>
<style lang="css" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
