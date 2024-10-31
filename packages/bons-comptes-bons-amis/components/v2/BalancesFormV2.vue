<script setup lang="ts">
import StyledButton from '@/components/StyledButton.vue'
import AffichageRemboursementsV2 from '@/components/v2/AffichageRemboursementsV2.vue'
import BalanceInputV2 from './BalanceInputV2.vue'

const storeBalancesEtRemboursements = useBalancesEtRemboursementsStore()
const { calculerRemboursements, retirerBalancerEtViderComptes, addBalance } =
  storeBalancesEtRemboursements

const {
  remboursementsModifies,
  calculLoading,
  historiqueDépenses,
  balances,
  depensesParPersonne,
  nomsBalances,
  matriceDeRemboursements
} = storeToRefs(storeBalancesEtRemboursements)

const toaster = useTemplateRef('toaster')
</script>

<template>
  <DesignToaster ref="toaster">Veuillez ajouter au moins trois personnes</DesignToaster>

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
      <StyledButton label="Ajouter une personne" @click="addBalance" />
      <StyledButton
        label="Calculer remboursements"
        :disabled="!remboursementsModifies"
        @click="balances.length < 3 ? toaster?.afficherToaster() : calculerRemboursements()"
      ></StyledButton>
    </template>
    <template #deuxieme-groupe v-if="historiqueDépenses.length > 0">
      <UCommandPalette v-if="calculLoading" loading placeholder="loading" :emptyState="null" />
      <AffichageRemboursementsV2 v-else :matriceDeRemboursements :nomsBalances />
    </template>
  </TemplatesBalances>
</template>
