import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './assets/style.css'

import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(),
  // pass the generated routes written by the plugin 🤖
  routes
})

createApp(App).use(router).mount('#app')
