<script setup lang="ts" generic="ModelValueType extends number | string[]">
const modelValue = defineModel<ModelValueType>({ required: true })

defineProps<{
  nomsBalances: string[]
  id: string
  name: string
}>()
</script>

<template>
  <div class="selecteur">
    <label :for="id">Dépenseur</label>

    <select :name :id v-model="modelValue">
      <option v-for="(nom, i) in nomsBalances" :value="i" :key="nom">{{ nom }}</option>
    </select>
  </div>
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
