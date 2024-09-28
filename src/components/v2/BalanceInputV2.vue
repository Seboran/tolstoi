<script setup lang="ts">
import StyledTextInput from '@/components/StyledTextInput.vue'
import StyledNumberInput from '@/components/StyledNumberInput.vue'
import StyledButton from '../StyledButton.vue'
const balance = defineModel<number>('balance')
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
        <div><StyledButton @click="$emit('remove')" label="supprimer" /></div>
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
