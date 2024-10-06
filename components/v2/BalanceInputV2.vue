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
  <tr class="balances">
    <td>
      <section>
        <div>
          <StyledTextInput class="nom-personne" label="Nom" v-model="name" :id="name + 'nom'" />
        </div>
        <div>
          <StyledNumberInput label="Dépense" v-model="balance"></StyledNumberInput>
        </div>
        <div>
          <UButton aria-label="delete" @click="$emit('remove')" icon="i-heroicons-trash"></UButton>
        </div>
      </section>
    </td>
  </tr>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: row;
  gap: 20px;
}
</style>
