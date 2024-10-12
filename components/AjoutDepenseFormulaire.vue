<script setup lang="ts">
import MultiSelecteur from './MultiSelecteur.vue'
import SelecteurDepenseur from './SelecteurDepenseur.vue'
import StyledButton from './StyledButton.vue'
import StyledNumberInput from './StyledNumberInput.vue'

defineProps<{
  nomsBalances: string[]
}>()
const indexDepenseur = defineModel<number>('indexDepenseur', { required: true })
const montant = defineModel<number>('montant', { required: true })
const bénéficiaires = defineModel<number[]>('beneficiaire', { required: true })

const emit = defineEmits<{
  ajouterDepense: [indexDepenseur: number, montant: number, bénéficiaires: number[]]
}>()

function ajouterDepense() {
  if (bénéficiaires.value.length === 0) {
    return
  }

  if (montant.value <= 0) {
    return
  }

  emit('ajouterDepense', indexDepenseur.value, montant.value, bénéficiaires.value)
}
</script>

<template>
  <div class="flex items-start flex-col gap-2">
    <SelecteurDepenseur id="dépenseur" v-model="indexDepenseur" :nomsBalances name="dépenseur" />
    <StyledNumberInput
      class="w-full"
      v-model="montant"
      label="a dépensé"
      id="montant"
    ></StyledNumberInput>
    <label for="bénéficiaires" aria-label="pour les bénéficiaires"> pour </label>

    <MultiSelecteur
      id="bénéficiaires"
      v-model="bénéficiaires"
      name="bénéficiaires"
      :nomsBalances
    ></MultiSelecteur>

    <StyledButton class="w-full" label="Ajouter une dépense" @click="ajouterDepense"></StyledButton>
  </div>
</template>
