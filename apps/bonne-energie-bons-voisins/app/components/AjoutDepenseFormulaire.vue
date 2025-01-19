<script setup lang="ts">
import MultiSelecteur from './MultiSelecteur.vue'
import SelecteurDepenseur from './SelecteurDepenseur.vue'

defineProps<{
  nomsBalances: string[]
}>()
const indexDepenseur = defineModel<number>('indexDepenseur', { required: true })
const montant = defineModel<number>('montant', { required: true })
const bénéficiaires = defineModel<number[]>('beneficiaire', { required: true })

const emit = defineEmits<{
  ajouterDepense: [indexDepenseur: number, montant: number, bénéficiaires: number[]]
}>()

const showErreurPasAssezNoms = defineModel<boolean>('showErreurPasAssezNoms', {
  required: true,
})
function ajouterDepense() {
  if (peutAjouterDepense.value) {
    showErreurPasAssezNoms.value = true
    return
  }
  if (bénéficiaires.value.length === 0) {
    return
  }

  if (montant.value <= 0) {
    return
  }

  showErreurPasAssezNoms.value = false
  emit('ajouterDepense', indexDepenseur.value, montant.value, bénéficiaires.value)
}

const peutAjouterDepense = computed(() => montant.value <= 0 || bénéficiaires.value.length === 0)
</script>

<template>
  <div class="flex flex-col items-start">
    <SelecteurDepenseur
      class="w-full"
      id="dépenseur"
      v-model="indexDepenseur"
      :nomsBalances
      name="dépenseur"
    />
    <StyledNumberInput
      class="w-full"
      v-model="montant"
      label="a dépensé"
      id="montant"
    ></StyledNumberInput>

    <MultiSelecteur
      class="mb-2"
      id="bénéficiaires"
      v-model="bénéficiaires"
      name="bénéficiaires"
      :nomsBalances
    ></MultiSelecteur>

    <BoutonCalculerRemboursements
      @click="ajouterDepense"
      class="w-full"
      label="Ajouter une dépense"
      :show-error-message="showErreurPasAssezNoms"
    >
      <template #error-message> Veuillez rajouter au moins 3 noms dans la liste </template>
    </BoutonCalculerRemboursements>
  </div>
</template>
