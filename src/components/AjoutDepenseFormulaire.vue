<script setup lang="ts">
import StyledButton from './StyledButton.vue'

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
  emit('ajouterDepense', indexDepenseur.value, montant.value, bénéficiaires.value)
}
</script>

<template>
  <select name="dépenseur" id="dépenseur" v-model="indexDepenseur">
    <option v-for="(nom, i) in nomsBalances" :value="i" :key="nom">{{ nom }}</option>
  </select>

  <label for="montant">a dépensé</label>
  <input type="number" name="montant" id="montant" v-model="montant" />
  <label for="bénéficiaires">pour</label>
  <select name="cars" id="cars" multiple v-model="bénéficiaires">
    <option v-for="(nom, i) in nomsBalances" :value="i" :key="nom">{{ nom }}</option>
  </select>
  <StyledButton label="Ajouter dépense" @click="ajouterDepense"></StyledButton>
</template>
