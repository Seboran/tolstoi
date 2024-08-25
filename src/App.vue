<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { useClipboard } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'
import { listEntries, showPassword } from './bindings'
import ListOfEntryPasswords from './ListOfEntryPasswords.vue'

const passwordEntries = ref<string[]>()

onMounted(async () => {
  passwordEntries.value = await listEntries()
})

const nameSearch = ref('')

const filteredPasswordList = computed(() =>
  passwordEntries.value?.filter((name) =>
    name.toLocaleUpperCase().includes(nameSearch.value.toLocaleUpperCase())
  )
)

const { copy } = useClipboard()

async function copyPassword(name: string) {
  const entry = await showPassword(name)

  if (!entry) {
    console.log('No entry for this name')
    return
  }
  const [password] = entry.split('\n')
  await copy(password)
}
</script>

<template>
  <div class="container">
    <h1>Ananas Pass</h1>

    <section>
      <h2>Liste des mots de passe</h2>
      <label for="search">Chercher entrée</label>
      <input id="search" v-model="nameSearch" type="search" name="search" />
      <ListOfEntryPasswords
        v-if="filteredPasswordList"
        :filtered-password-list="filteredPasswordList"
        @copy="copyPassword"
      />
    </section>
  </div>
</template>

<style scoped>
:root {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;

  color: #0f0f0f;
  background-color: #f6f6f6;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

.container {
  margin: 0;
  padding-top: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

h1 {
  text-align: center;
}

table {
  margin: auto;
}
</style>
