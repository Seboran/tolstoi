<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { useClipboard } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'
import { listEntries, showPassword } from './bindings'
import MainTitle from './components/headings/MainTitle.vue'
import Input from './components/ui/input/Input.vue'
import Label from './components/ui/label/Label.vue'
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

const entries = ref<InstanceType<typeof ListOfEntryPasswords> | null>(null)
</script>

<template>
  <div class="container w-full">
    <MainTitle>Nirina Pass</MainTitle>
    <section class="w-full">
      <form
        class="grid w-full max-w-sm items-center gap-1.5"
        @submit.prevent="entries?.items?.[0]?.$el.focus()"
      >
        <Label for="search">Chercher entrée</Label>
        <Input id="search" v-model="nameSearch" type="search" name="search" autofocus />
      </form>
      <div class="w-full">
        <ListOfEntryPasswords
          v-if="filteredPasswordList"
          :filtered-password-list="filteredPasswordList"
          @copy="copyPassword"
          ref="entries"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.container {
  margin: 0;
  display: flex;
  flex-direction: column;
}
</style>
