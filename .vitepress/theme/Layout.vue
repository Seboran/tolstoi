<script setup lang="ts">
import { useData } from 'vitepress'
import Article from './Article.vue'
import Contact from './Contact.vue'
import Home from './Home.vue'
import NotFound from './NotFound.vue'
import AnimatedBoutonMeContacter from './components/AnimatedBoutonMeContacter.vue'
import AnimatedTitle from './components/AnimatedTitle.vue'

const { page, frontmatter } = useData()
</script>

<template>
  <div class="antialiased dark:bg-slate-900 min-h-screen">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <nav class="flex justify-between items-center py-10 font-bold">
        <AnimatedTitle :show="frontmatter.index" />
        <AnimatedBoutonMeContacter />
      </nav>
    </div>
    <main class="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <Home v-if="frontmatter.index" />
      <Contact v-else-if="page.relativePath === 'contact.md'" />
      <NotFound v-else-if="page.isNotFound" />
      <Article v-else-if="page.relativePath.startsWith('posts')" />
      <section v-else>
        <Content class="prose dark:prose-invert max-w-none pt-10 pb-8" />
      </section>
    </main>
  </div>
</template>
