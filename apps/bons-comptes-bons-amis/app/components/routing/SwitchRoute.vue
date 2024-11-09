<script setup lang="ts">
import type { RoutesNamesList } from '@typed-router'

const ModesRemboursement = {
  rapide: 'rapide',
  detaille: 'detaille',
  tuto: 'tuto'
} as const

defineEmits<{
  click: []
}>()

defineProps<{
  selectedTab: 0 | 1
}>()

const items: {
  label: string
  key: keyof typeof ModesRemboursement
  routeName: RoutesNamesList
}[] = [
  { label: 'Mode rapide', key: ModesRemboursement.rapide, routeName: 'index' },
  { label: 'Mode détaillé', key: ModesRemboursement.detaille, routeName: 'detaille' }
]

const { allowUserInput } = useCanUserInteract()
const activeItemTabs = computed(() =>
  items.map((item) => ({ ...item, disabled: false || !allowUserInput.value }))
)
</script>

<template>
  <UTabs :items="activeItemTabs" :model-value="selectedTab" @change="$emit('click')" unmount>
    <template #item>
      <slot />
    </template>
  </UTabs>
</template>
