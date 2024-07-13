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
      <div>
        <label>
          <input type="checkbox" :value="modelValue.includes(i)" @change="onClickOption(i)" />
          {{ nom }}
        </label>
      </div>
    </template>
  </div>
</template>

<style scoped>
select {
  appearance: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
  cursor: pointer;
}

option:hover {
  background-color: #f0f0f0;
}
</style>
