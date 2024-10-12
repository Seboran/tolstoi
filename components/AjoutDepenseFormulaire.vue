<script setup lang="ts">
import { disableButtons } from './injectSymbols/disableSymbol'
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

const peutAjouterDepense = computed(() => montant.value <= 0 || bénéficiaires.value.length === 0)
const disabledFromParent = inject(disableButtons, false)
</script>

<template>
  <div class="flex items-start flex-col">
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
      id="bénéficiaires"
      v-model="bénéficiaires"
      name="bénéficiaires"
      :nomsBalances
    ></MultiSelecteur>

    <UTooltip
      class="w-full"
      :prevent="!peutAjouterDepense || disabledFromParent"
      :popper="{ placement: 'top' }"
    >
      <template #text>Vous devez renseigner une dépense positive</template>
      <StyledButton
        class="w-full mt-3"
        label="Ajouter une dépense"
        :disabled="peutAjouterDepense"
        @click="ajouterDepense"
      ></StyledButton>
    </UTooltip>
  </div>
</template>
