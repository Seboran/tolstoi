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

const animateAjouterBouton = ref(false)

const toaster = useTemplateRef('toaster')

const showErreurPasAssezNoms = ref(false)
function addBalanceEtEffacerErreur() {
  addBalance()
  if (balances.value.length > 2) {
    showErreurPasAssezNoms.value = false
  }
}
</script>

<template>
  <DesignToaster ref="toaster">Veuillez ajouter au moins trois personnes</DesignToaster>

  <TemplatesBalances>
    <template #premier-groupe>
      <div v-show="balances.length" title="Balances personnes">
        <template v-for="(_balance, index) in balances" :key="index">
          <BalanceInput v-model:balance="balances[index]" v-model:name="nomsBalances[index]" />
        </template>
      </div>
      <StyledButton
        :class="{ shake: animateAjouterBouton }"
        label="Ajouter une personne"
        @click="addBalanceEtEffacerErreur"
      />
    </template>
    <template #deuxieme-groupe>
      <AjoutDepenseFormulaire
        class="w-full"
        v-model:show-erreur-pas-assez-noms="showErreurPasAssezNoms"
        v-model:indexDepenseur="indexDepenseur"
        v-model:montant="montant"
        v-model:beneficiaire="bénéficiaires"
        :nomsBalances="nomsBalances"
        @ajouterDepense="ajouterDepense"
      />
      <hr />
    </template>
    <template #troisieme-groupe>
      <div v-if="isLoading" class="space-y-2">
        <USkeleton class="h-4 w-full" />
        <USkeleton class="h-4 w-3/4" />
      </div>

      <AffichageRemboursementsV2 v-else :matriceDeRemboursements :nomsBalances />
      <h2 class="text-lg">Historique dépenses :</h2>
      <HistoriqueDepenses :historiqueDépenses="historiqueDépenses" :nomsBalances="nomsBalances" />
    </template>
  </TemplatesBalances>
</template>

<style scoped>
.shake,
.animer {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-2px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(4px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-8px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(8px, 0, 0);
  }
}
</style>
