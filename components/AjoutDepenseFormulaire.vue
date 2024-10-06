<script setup lang="ts">
import { computed } from 'vue'
import SelecteurDepenseur from './SelecteurDepenseur.vue'
import StyledButton from './StyledButton.vue'
import StyledNumberInput from './StyledNumberInput.vue'
import MultiSelecteur from './MultiSelecteur.vue'

const props = defineProps<{
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
  <div
    style="
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    "
  >
    <div style="width: 100%">
      <SelecteurDepenseur id="dépenseur" v-model="indexDepenseur" :nomsBalances name="dépenseur" />
    </div>
  </div>
  <div style="display: flex; flex-direction: row; align-items: center; width: 100%">
    <label style="margin-right: 20px; text-wrap: nowrap" for="montant"> a dépensé </label>
    <div style="width: 100%">
      <StyledNumberInput v-model="montant" label="montant" id="montant"></StyledNumberInput>
    </div>
    <label style="margin-left: 20px" for="bénéficiaires" aria-label="pour les bénéficiaires">
      pour
    </label>
  </div>

  <MultiSelecteur
    id="bénéficiaires"
    v-model="bénéficiaires"
    name="bénéficiaires"
    :nomsBalances
  ></MultiSelecteur>

  <StyledButton label="Ajouter une dépense" @click="ajouterDepense"></StyledButton>
</template>
