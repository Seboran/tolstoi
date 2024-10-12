<script setup lang="ts">
import StyledButton from '@/components/StyledButton.vue'
import AffichageRemboursementsV2 from '@/components/v2/AffichageRemboursementsV2.vue'
import BalanceInputV2 from './BalanceInputV2.vue'

const {
  calculerRemboursements,
  remboursementsModifies,
  calculLoading,
  historiqueDépenses,
  retirerBalancerEtViderComptes,
  balances,
  depensesParPersonne,
  nomsBalances,
  addBalance,
  matriceDeRemboursements
} = useRemboursements()
</script>

<template>
  <TemplatesBalances>
    <template #premier-groupe>
      <table title="Balances personnes">
        <template v-for="(_balance, index) in balances" :key="index">
          <BalanceInputV2
            v-model:balance="depensesParPersonne[index]"
            v-model:name="nomsBalances[index]"
            @remove="retirerBalancerEtViderComptes(index)"
          />
        </template>
      </table>
      <StyledButton label="Ajouter une personne" @click="addBalance" />
      <StyledButton
        v-if="balances.length >= 2"
        label="Calculer remboursements"
        :disabled="!remboursementsModifies"
        @click="calculerRemboursements"
      ></StyledButton>
    </template>
    <template #deuxieme-groupe v-if="historiqueDépenses.length > 0">
      <UCommandPalette v-if="calculLoading" loading placeholder="loading" :emptyState="null" />
      <AffichageRemboursementsV2 v-else :matriceDeRemboursements :nomsBalances />
    </template>
  </TemplatesBalances>
</template>
