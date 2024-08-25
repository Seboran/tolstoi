<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { invoke } from '@tauri-apps/api/tauri'
import { computed, onMounted, ref } from 'vue'
import { useClipboard } from '@vueuse/core'

const passwordEntries = ref<string[]>()

onMounted(async () => {
  passwordEntries.value = await invoke<string[]>('list_entries')
})

const nameSearch = ref('')

const filteredPasswordList = computed(() =>
  passwordEntries.value?.filter((name) =>
    name.toLocaleUpperCase().includes(nameSearch.value.toLocaleUpperCase())
  )
)

const { copy } = useClipboard()

async function copyPassword(name: string) {
  const entry = await invoke<string>('show_password', { name })
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
      <input type="search" name="search" id="search" v-model="nameSearch" />
      <table>
        <thead>
          <th>Nom</th>
          <th>mot de passe</th>
          <th>actions</th>
        </thead>
        <tbody>
          <tr v-for="passwordItem in filteredPasswordList" :key="passwordItem">
            <td>{{ passwordItem }}</td>
            <td>
              <input
                type="password"
                name="password of {{ passwordItem }}"
                id="password{{ passwordItem }}"
                value="*************"
              />
            </td>
            <td>
              <button type="button" @click="copyPassword(passwordItem)">Copy to clipboard</button>
              <button type="button">Auto type</button>
            </td>
          </tr>
        </tbody>
      </table>
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
