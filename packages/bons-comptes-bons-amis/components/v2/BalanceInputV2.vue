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
  <div class="grid grid-flow-col grid-cols-2 gap-1 my-1 w-full">
    <StyledTextInput label="Nom" v-model="name" :id="name + 'nom'" />
    <StyledNumberInput
      :id="'depense_' + name"
      label="Dépense"
      v-model="balance"
      :aria-label="'dépense de ' + name"
    ></StyledNumberInput>
    <UTooltip text="Supprimer personne ?" :popper="{ placement: 'top' }">
      <UButton class="text-center" variant="ghost" aria-label="delete" @click="$emit('remove')"
        >❌</UButton
      >
    </UTooltip>
  </div>
</template>
