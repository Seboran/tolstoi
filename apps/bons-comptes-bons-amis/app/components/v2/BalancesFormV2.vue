<script setup lang="ts">
import AffichageRemboursementsV2 from '@/components/v2/AffichageRemboursementsV2.vue'
import BalanceInputV2 from './BalanceInputV2.vue'

const storeBalancesEtRemboursements = useBalancesEtRemboursementsStore()
const { calculerRemboursements, retirerBalancerEtViderComptes, addBalance } =
  storeBalancesEtRemboursements

const {
  calculLoading,
  historiqueDépenses,
  balances,
  depensesParPersonne,
  nomsBalances,
  matriceDeRemboursements,
} = storeToRefs(storeBalancesEtRemboursements)

const toaster = useTemplateRef('toaster')

const erreurRemboursement = ref(false)
function clickOnCalculerRemboursement() {
  balances.value.length < 3
    ? afficherErreurCalculRemboursement()
    : calculerRemboursementsEtRetirerErreur()
}

function addBalanceEtRetirerErreur() {
  erreurRemboursement.value = false
  addBalance()
}

function calculerRemboursementsEtRetirerErreur() {
  calculerRemboursements()
  erreurRemboursement.value = false
}

function afficherErreurCalculRemboursement() {
  toaster?.value?.afficherToaster()
  erreurRemboursement.value = true
}
</script>

<template>
  <Toaster ref="toaster">Veuillez ajouter au moins trois personnes</Toaster>

  <TemplatesBalances>
    <template #premier-groupe>
      <div v-show="balances.length" title="Balances personnes">
        <template v-for="(_balance, index) in balances" :key="index">
          <BalanceInputV2
            v-model:balance="depensesParPersonne[index]"
            v-model:name="nomsBalances[index]"
            @remove="retirerBalancerEtViderComptes(index)"
          />
        </template>
      </div>
      <StyledButton label="Ajouter une personne" @click="addBalanceEtRetirerErreur" />
      <div>
        <BoutonCalculerRemboursements
          label="Calculer remboursements"
          :show-error-message="erreurRemboursement"
          @click="clickOnCalculerRemboursement"
        >
          <template #error-message>Veuillez ajouter au moins trois personnes</template>
        </BoutonCalculerRemboursements>
      </div>
    </template>
    <template #deuxieme-groupe v-if="historiqueDépenses.length > 0">
      <div v-if="calculLoading" class="space-y-2">
        <USkeleton class="h-4 w-full" />
        <USkeleton class="h-4 w-3/4" />
      </div>
      <AffichageRemboursementsV2 v-else :matriceDeRemboursements :nomsBalances />
    </template>
  </TemplatesBalances>
</template>
