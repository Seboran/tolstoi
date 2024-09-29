<script setup lang="ts">
import { useData } from 'vitepress'
import { onMounted, ref } from 'vue'
import Article from './Article.vue'
import Contact from './Contact.vue'
import Home from './Home.vue'
import NotFound from './NotFound.vue'

const { page, frontmatter } = useData()

const shake = ref(false)

const DELAI_AVANT_AGITER_BOUTON_CONTACTER_IN_MS = 5000
onMounted(() => {
  setTimeout(() => (shake.value = true), DELAI_AVANT_AGITER_BOUTON_CONTACTER_IN_MS)
})
</script>

<template>
  <div class="antialiased dark:bg-slate-900">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <nav class="flex justify-between items-center py-10 font-bold">
        <a class="text-xl" href="/" aria-label="The Vue Point">
          ✨
          <span
            v-if="!frontmatter.index"
            class="hidden md:inline dark:text-white"
            >Nirina Rabeson</span
          >
        </a>
        <Transition appear name="appear">
          <div
            class="text-sm text-gray-500 dark:text-white leading-5"
            :class="{
              shake
            }"
          >
            <a
              class="hover:text-gray-700 dark:hover:text-gray-200"
              href="https://www.linkedin.com/in/nirinarabeson/"
              target="_blank"
              rel="noopener"
              >Me contacter →</a
            >
          </div>
        </Transition>
      </nav>
    </div>
    <main class="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <Home v-if="frontmatter.index" />
      <Contact v-else-if="page.relativePath === 'contact.md'" />
      <NotFound v-else-if="page.isNotFound" />
      <Article v-else />
    </main>
  </div>
</template>

<style lang="css" scoped>
.appear-enter-active,
.appear-leave-active {
  transition: opacity 0.5s ease;
  transition-delay: 0.225s;
}

.appear-enter-from,
.appear-leave-to {
  opacity: 0;
}

.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-2px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(4px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-8px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(8px, 0, 0);
  }
}
</style>
