<script setup lang="ts">
defineProps<{
  label: string | undefined
  id: string
}>()

const name = defineModel<string>({ required: true })
</script>

<template>
  <div style="position: relative">
    <label :for="id">{{ label }}</label>
    <input :label :id v-model="name" type="text" />
  </div>
</template>

<style scoped>
label {
  position: absolute;
  top: -8px;
  left: 5px;
  padding: 3px;
  font-size: xx-small;
  background-color: #fff;
}
div {
  display: flex;
  flex-direction: column;
  margin: 3px;
  width: 100%;
}
input {
  background-color: #fff;
  color: #495057;
  border: 1px solid #ced4da;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  transition: border-color 0.2s;
  width: 100%;
}
</style>
