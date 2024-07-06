<script setup lang="ts">
import AffichageRemboursements from '@/components/AffichageRemboursements.vue'
import BalanceInput from '@/components/BalanceInput.vue'
import ChargementCalcul from '@/components/ChargementCalcul.vue'
import { fetchBalances } from '@/components/useFetchBalances'
import NOMS_AU_HASARD from '@/nomsAuHasard.json'
import { useAsyncState } from '@vueuse/core'
import { computed, ref } from 'vue'
const balances = ref<number[]>([])
const nomsBalances = ref<string[]>([])

function addBalance() {
  balances.value.push(0)
  nomsBalances.value.push(NOMS_AU_HASARD[nomsBalances.value.length])
}

const matriceDeRemboursements = ref<number[][]>([])

async function solveBalances() {
  try {
    matriceDeRemboursements.value = []
    const solution = await fetchBalances(balances)
    matriceDeRemboursements.value = solution.result_matrix
  } finally {
    //
  }
}

const { isLoading, execute } = useAsyncState(solveBalances, undefined, { immediate: false })

const erreurBalance = computed(() =>
  balances.value
    .filter((b) => !isNaN(b))
    .reduce((total, balance) => total + balance, 0)
    .toFixed(2)
)

const indexDepenseur = ref(0)
const montant = ref(0)
const bénéficiaires = ref<number[]>([])
function ajouterDepense() {
  const montantParBénéficiaire = montant.value / bénéficiaires.value.length
  bénéficiaires.value.forEach((indexBénéficiaire) => {
    balances.value[indexBénéficiaire] -= montantParBénéficiaire
  })
  balances.value[indexDepenseur.value] += montant.value

  historiqueDépenses.value.push({
    indexDépenseur: indexDepenseur.value,
    montant: montant.value,
    listeIndexesBénéficiares: bénéficiaires.value
  })
}

const historiqueDépenses = ref<
  { indexDépenseur: number; montant: number; listeIndexesBénéficiares: number[] }[]
>([])
</script>

<template>
  <div class="main-app">
    <section>
      <label for="dépenseur">Un</label>

      <select name="dépenseur" id="dépenseur" v-model="indexDepenseur">
        <option v-for="(nom, i) in nomsBalances" :value="i" :key="nom">{{ nom }}</option>
      </select>

      <label for="montant">a dépensé</label>
      <input type="number" name="montant" id="montant" v-model="montant" />
      <label for="bénéficiaires">pour</label>
      <select name="cars" id="cars" multiple v-model="bénéficiaires">
        <option v-for="(nom, i) in nomsBalances" :value="i" :key="nom">{{ nom }}</option>
      </select>
      <input type="button" value="Ajouter dépense" @click="ajouterDepense" />
    </section>
    <section>
      <input type="button" value="Ajouter une personne" @click="addBalance" />
      <template v-for="(_balance, index) in balances" :key="index">
        <BalanceInput v-model:balance="balances[index]" v-model:name="nomsBalances[index]" />
      </template>
      Erreur de comptes à régler:
      {{ erreurBalance }}
    </section>
    <section>
      <input type="button" value="Calculer remboursements" @click="execute()" />
      <ChargementCalcul :isLoading="isLoading" />
      <AffichageRemboursements :matriceDeRemboursements :nomsBalances />
    </section>
    <section>
      <ul>
        <li
          v-for="(
            { indexDépenseur, listeIndexesBénéficiares, montant }, index
          ) in historiqueDépenses"
          :key="index"
        >
          {{ nomsBalances[indexDépenseur] }}
          a dépensé
          {{ montant }}€ pour
          {{ listeIndexesBénéficiares.map((index) => nomsBalances[index]).join(', ') }}
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.main-app {
  display: flex;
  flex-direction: flex;
  gap: 1rem;
  max-width: 1200px;
}
section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
