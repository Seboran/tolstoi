<script setup lang="ts">
const modelValue = defineModel<number[]>({ required: true })
defineProps<{
  nomsBalances: string[]
  id: string
  name: string
}>()

function onClickOption(optionSélectionnée: number) {
  if (modelValue.value.includes(optionSélectionnée)) {
    modelValue.value = modelValue.value.filter((option) => option !== optionSélectionnée)
  } else {
    modelValue.value = [...modelValue.value, optionSélectionnée]
  }
}
</script>

<template>
  <div>
    <template v-for="(nom, i) in nomsBalances" :key="nom">
      <UCheckbox @change="onClickOption(i)" :label="nom" />
    </template>
  </div>
</template>
