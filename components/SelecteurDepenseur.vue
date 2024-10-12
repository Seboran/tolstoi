<script setup lang="ts">
const modelValue = defineModel<number>({ required: true })

defineProps<{
  nomsBalances: string[]
  id: string
  name: string
}>()
</script>

<template>
  <DesignInput label="Dépenseur" :id>
    <USelect
      :id
      placeholder="Dépenseur"
      aria-label="Dépenseur"
      v-model="modelValue"
      :options="nomsBalances.map((nom, index) => ({ index, nom }))"
      option-attribute="nom"
      value-attribute="index"
    ></USelect>
  </DesignInput>
</template>

<style scoped>
.selecteur {
  position: relative;
  margin: 3px;
  width: 100%;
}
label {
  position: absolute;
  top: -8px;
  left: 5px;
  padding: 3px;
  font-size: xx-small;
  background-color: #fff;
}
select {
  width: 100%;
  appearance: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  background-color: #fff;
  color: #333;
  cursor: pointer;
}
</style>
