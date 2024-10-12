<script setup lang="ts">
import StyledTextInput from '@/components/StyledTextInput.vue'
import StyledNumberInput from '@/components/StyledNumberInput.vue'
const balance = defineModel<number>('balance', {
  required: true
})
const name = defineModel<string>('name', { required: true })

defineEmits<{
  remove: []
}>()
</script>

<template>
  <tr>
    <td :aria-label="name">
      <StyledTextInput label="Nom" v-model="name" :id="name + 'nom'" />
    </td>
    <td :aria-label="name">
      <StyledNumberInput
        :id="'depense_' + name"
        label="Dépense"
        v-model="balance"
      ></StyledNumberInput>
    </td>
    <td class="text-end" :aria-label="name">
      <UTooltip text="Supprimer personne ?" :popper="{ placement: 'top' }">
        <UButton aria-label="delete" @click="$emit('remove')" icon="i-heroicons-trash"></UButton>
      </UTooltip>
    </td>
  </tr>
</template>
