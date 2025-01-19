<script setup lang="ts">
const production = defineModel<number>('production', {
  required: true,
})
const consommation = defineModel<number>('consommation', {
  required: true,
})
const name = defineModel<string>('name', { required: true })

defineEmits<{
  remove: []
}>()
</script>

<template>
  <div class="my-1 grid w-full grid-flow-col grid-cols-2 gap-1">
    <StyledTextInput label="Nom" v-model="name" :id="name + 'nom'" />
    <StyledNumberInput
      :id="'production_' + name"
      label="Production"
      v-model="production"
      :aria-label="'production de ' + name"
    ></StyledNumberInput>
    <StyledNumberInput
      :id="'consommation_' + name"
      label="Consommation"
      v-model="consommation"
      :aria-label="'consommation de de ' + name"
    ></StyledNumberInput>
    <StyledNumberInput
      :id="'total_' + name"
      label="equilibre"
      :model-value="production - consommation"
      :aria-label="'total de de ' + name"
    ></StyledNumberInput>
  </div>
</template>
