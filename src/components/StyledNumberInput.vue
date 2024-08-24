<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    label: string
    id: string
    disabled: boolean
    modelValue: number
  }>(),
  {
    disabled: false
  }
)
const emit = defineEmits<{
  'update:modelValue': [number]
}>()
// const balance = defineModel<number>({ required: true })

const balanceString = ref(props.modelValue.toString())

const balanceLocale = computed({
  get: () => balanceString.value.replace(',', '.'),
  set: (value) => (balanceString.value = value)
})

watch(balanceString, () => emit('update:modelValue', parseFloat(balanceString.value)))
</script>

<template>
  <div class="selecteur">
    <label :for="id">{{ label }}</label>
    <input v-model="balanceLocale" type="string" :id :disabled />
  </div>
</template>

<style scoped>
.selecteur {
  position: relative;
  margin: 3px;
  width: 100%;
  margin: 3px;
}
label {
  position: absolute;
  top: -8px;
  left: 5px;
  padding: 3px;
  font-size: xx-small;
  background-color: #fff;
}
input {
  box-sizing: border-box;
  width: 100%;
  appearance: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  background-color: #fff;
  color: #333;
}

input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
