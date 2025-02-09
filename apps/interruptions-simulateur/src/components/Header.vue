<script setup lang="ts">
import { Linkedin } from 'lucide-vue-next'
</script>

<template>
  <header class="header">
    <div class="social-links">
      <a
        href="https://github.com/Seboran/monorepo/tree/main/apps/interruptions-simulateur"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <img height="30" width="30" src="https://cdn.simpleicons.org/github" alt="GitHub" />
      </a>
      <a
        href="https://bsky.app/profile/nirinarabeson.fr"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Bluesky"
      >
        <img height="30" width="30" src="https://cdn.simpleicons.org/bluesky" alt="Bluesky" />
      </a>
      <a
        href="https://www.linkedin.com/in/nirinarabeson/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <Linkedin class="linkedin-icon" />
      </a>
    </div>
  </header>
</template>

<style scoped>
.header {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
}

.social-links {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.social-links a {
  transition: opacity 0.2s ease;
  opacity: 0.6;
}

.social-links a:hover {
  opacity: 1;
}

.linkedin-icon {
  width: 30px;
  height: 30px;
}
</style>