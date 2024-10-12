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
    <template #deuxieme-groupe v-if="nomsBalances.length > 2">
      <AjoutDepenseFormulaire
        v-model:indexDepenseur="indexDepenseur"
        v-model:montant="montant"
        v-model:beneficiaire="bénéficiaires"
        :nomsBalances="nomsBalances"
        @ajouterDepense="ajouterDepense"
      />
      <hr />
    </template>
    <template #troisieme-groupe v-if="historiqueDépenses.length > 0">
      <UCommandPalette v-if="isLoading" loading placeholder="loading" :empty-state="null" />

      <AffichageRemboursementsV2 v-else :matriceDeRemboursements :nomsBalances />
      <h2 class="text-lg">Historique dépenses :</h2>
      <HistoriqueDepenses :historiqueDépenses="historiqueDépenses" :nomsBalances="nomsBalances" />
    </template>
  </TemplatesBalances>
</template>
