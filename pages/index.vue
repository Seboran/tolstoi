<script setup lang="ts">
import type { RoutesNamesList } from '@typed-router'

const ModesRemboursement = {
  rapide: 'rapide',
  detaille: 'detaille',
  tuto: 'tuto'
} as const

const items: {
  label: string
  key: keyof typeof ModesRemboursement
  routeName: RoutesNamesList
}[] = [
  { label: 'Mode rapide', key: ModesRemboursement.rapide, routeName: 'index-rapide' },
  { label: 'Mode détaillé', key: ModesRemboursement.detaille, routeName: 'index-detaille' }
]

const selectedTab = ref<number>(0)

const { push } = useRouter()
watchEffect(() => {
  push({ name: items[selectedTab.value].routeName })
})
const { allowUserInput } = useCanUserInteract()
const activeItemTabs = computed(() =>
  items.map((item) => ({ ...item, disabled: false || !allowUserInput.value }))
)
</script>

<template>
  <UTabs :items="activeItemTabs" v-model="selectedTab" unmount>
    <template #item>
      <NuxtPage />
    </template>
  </UTabs>
</template>
