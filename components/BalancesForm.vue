<script setup lang="ts">
import BalanceInput from '@/components/BalanceInput.vue'
import { useThrottleFn } from '@vueuse/core'
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

const animateAjouterBouton = ref(false)

function changeAnimateAjouterBouton() {
  animateAjouterBouton.value = true
  setTimeout(() => (animateAjouterBouton.value = false), 4000)
}
const debouncedEteindreBouton = useThrottleFn(() => changeAnimateAjouterBouton())
</script>

<template>
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
        @click="addBalance"
      />
    </template>
    <template #deuxieme-groupe>
      <InjectorsInjectDisableButtons class="w-full" :value="disableSelecteur">
        <UTooltip
          class="w-full relative"
          :prevent="!disableSelecteur"
          :popper="{ placement: 'top' }"
        >
          <template #text>Vous devez ajouter au moins trois personnes</template>
          <div
            v-show="disableSelecteur"
            class="absolute h-40 z-20 bg-transparent w-full"
            @click="debouncedEteindreBouton"
          ></div>
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
