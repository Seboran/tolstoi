<script setup lang="ts">
import Date from './Date.vue'
import { data as posts } from './posts.data.js'
import AnimatedHomeTitle from './components/AnimatedHomeTitle.vue'
import { computed } from 'vue'

const filteredPosts = computed(() =>
  posts.filter((post) => post.date.time !== null)
)
</script>

<template>
  <div class="divide-y divide-gray-200 dark:divide-slate-200/5">
    <div class="pt-6 pb-8 space-y-2 md:space-y-5">
      <AnimatedHomeTitle />
      <p class="description text-lg leading-7 text-gray-500 dark:text-white">
        Je suis développeur fullstack actuellement chez
        <a
          class="shake zenika-lien font-bold"
          href="https://www.linkedin.com/company/zenika"
          target="_blank"
          >Zenika</a
        >. Je suis passionné de musique, de stack javascript, mais j'adore aussi
        le partage et la bonne vibe. Motivé par une énergie détonnante et une
        bonne humeur inébranlable, j'ai plaisir à contribuer et partager, que ce
        soit dans le domaine du web, de l'intelligence artificielle, ou de
        sujets très variés un peu geeks.
      </p>
    </div>
    <ul class="divide-y divide-gray-200 dark:divide-slate-200/5">
      <li class="py-12" v-for="{ title, url, date, excerpt } of filteredPosts">
        <article
          class="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline"
        >
          <Date :date="date" />
          <div class="space-y-5 xl:col-span-3">
            <div class="space-y-6">
              <h2 class="text-2xl leading-8 font-bold tracking-tight">
                <a
                  class="rainbow-animation text-gray-900 dark:text-white"
                  :href="url"
                  >{{ title }}</a
                >
              </h2>
              <div
                v-if="excerpt"
                class="prose dark:prose-invert max-w-none text-gray-500 dark:text-gray-300"
                v-html="excerpt"
              ></div>
            </div>
            <div class="text-base leading-6 font-medium">
              <a class="link" aria-label="read more" :href="url">Lire plus →</a>
            </div>
          </div>
        </article>
      </li>
    </ul>
  </div>
</template>

<style lang="css" scoped>
.zenika-lien {
  transition: 1s all ease;
  color: color-mix(in oklab, hsl(0, 70%, 35.29%) 0%, black);
}

.description:hover .zenika-lien,
.zenika-lien:hover {
  color: color-mix(in oklab, hsl(0, 70%, 35.29%) 100%, black);
}
@media (prefers-color-scheme: dark) {
  .zenika-lien {
    color: color-mix(in oklab, hsl(0, 70%, 35.29%) 0%, white);
  }
  .description:hover .zenika-lien,
  .zenika-lien:hover {
    color: color-mix(in oklab, hsl(0, 70%, 35.29%) 100%, white);
  }
}
</style>
