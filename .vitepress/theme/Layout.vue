<script setup lang="ts">
import { useData } from 'vitepress'
import Home from './Home.vue'
import Contact from './Contact.vue'
import Article from './Article.vue'
import NotFound from './NotFound.vue'

const { page, frontmatter } = useData()
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
        <div class="text-sm text-gray-500 dark:text-white leading-5">
          <a
            class="hover:text-gray-700 dark:hover:text-gray-200"
            href="https://www.linkedin.com/in/nirinarabeson/"
            target="_blank"
            rel="noopener"
            ><span class="hidden sm:inline">Me </span>contacter →</a
          >
        </div>
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
