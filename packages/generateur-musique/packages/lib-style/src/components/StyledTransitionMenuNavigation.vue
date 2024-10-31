<template>
  <Transition name="slide">
    <slot />
  </Transition>
</template>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-175px);
}
</style>
