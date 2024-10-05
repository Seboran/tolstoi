<script setup lang="ts" generic="ModelValueType extends number | string[]">
const modelValue = defineModel<ModelValueType>({ required: true })

const props = defineProps<{
  nomsBalances: ModelValueType[]
  id: string
  name: string
}>()
const _model = ref<ModelValueType>(modelValue.value)

watch(_model, () => {
  modelValue.value = props.nomsBalances[_model.value]
})
</script>

<template>
  <div class="selecteur">
    <USelect
      placeholder="Dépenseur"
      aria-label="Dépenseur"
      v-model="modelValue"
      :options="nomsBalances.map((nom, index) => ({ index, nom }))"
      option-attribute="nom"
      value-attribute="index"
    ></USelect>
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
