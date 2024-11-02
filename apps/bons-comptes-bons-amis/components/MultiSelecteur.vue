<script setup lang="ts">
const modelValue = defineModel<number[]>({ required: true })
defineProps<{
  nomsBalances: string[]
  id: string
  name: string
}>()

const setBénéficiaires = computed({
  get() {
    return new Set<number>(modelValue.value)
  },
  set(val) {
    modelValue.value = Array.from(val)
  }
})

function onClickOption(optionSélectionnée: number) {
  // Vue reactivity does not work on sets, so you have to make it yourself through arrays
  const newSet = new Set<number>([...setBénéficiaires.value])
  if (setBénéficiaires.value.has(optionSélectionnée)) {
    newSet.delete(optionSélectionnée)
  } else {
    newSet.add(optionSélectionnée)
  }
  setBénéficiaires.value = new Set([...newSet])
}
</script>

<template>
  <div class="mx-1">
    <label class="text-xs" for="bénéficiaires" aria-label="pour les bénéficiaires"> pour </label>
    <template v-for="(nom, i) in nomsBalances" :key="nom">
      <UCheckbox :model-value="setBénéficiaires.has(i)" @change="onClickOption(i)" :label="nom" />
    </template>
  </div>
</template>
