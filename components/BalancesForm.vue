<script setup lang="ts">
import BalanceInput from '@/components/BalanceInput.vue'
import AjoutDepenseFormulaire from './AjoutDepenseFormulaire.vue'
import HistoriqueDepenses from './HistoriqueDepenses.vue'
import StyledButton from './StyledButton.vue'
import AffichageRemboursementsV2 from './v2/AffichageRemboursementsV2.vue'

const balancesDetailStore = useBalancesDetaillesStore()
const { ajouterDepense, addBalance } = balancesDetailStore
const {
  balances,
  nomsBalances,
  indexDepenseur,
  montant,
  bénéficiaires,
  isLoading,
  historiqueDépenses,
  matriceDeRemboursements
} = storeToRefs(balancesDetailStore)

const disableSelecteur = computed(() => nomsBalances.value.length < 3)
</script>

<template>
  <TemplatesBalances>
    <template #premier-groupe>
      <div v-show="balances.length" title="Balances personnes">
        <template v-for="(_balance, index) in balances" :key="index">
          <BalanceInput v-model:balance="balances[index]" v-model:name="nomsBalances[index]" />
        </template>
      </div>
      <StyledButton label="Ajouter une personne" @click="addBalance" />
    </template>
    <template #deuxieme-groupe>
      <InjectorsInjectDisableButtons class="w-full" :value="disableSelecteur">
        <UTooltip class="w-full" :prevent="!disableSelecteur" :popper="{ placement: 'top' }">
          <template #text>Vous devez ajouter au moins trois personnes</template>
          <AjoutDepenseFormulaire
            class="w-full"
            v-model:indexDepenseur="indexDepenseur"
            v-model:montant="montant"
            v-model:beneficiaire="bénéficiaires"
            :nomsBalances="nomsBalances"
            @ajouterDepense="ajouterDepense"
          />
        </UTooltip>
      </InjectorsInjectDisableButtons>
      <hr />
    </template>
    <template #troisieme-groupe>
      <UCommandPalette v-if="isLoading" loading placeholder="loading" :empty-state="null" />

      <AffichageRemboursementsV2 v-else :matriceDeRemboursements :nomsBalances />
      <h2 class="text-lg">Historique dépenses :</h2>
      <HistoriqueDepenses :historiqueDépenses="historiqueDépenses" :nomsBalances="nomsBalances" />
    </template>
  </TemplatesBalances>
</template>
