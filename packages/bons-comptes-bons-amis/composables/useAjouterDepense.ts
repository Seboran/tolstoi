import { ref, type Ref } from 'vue'
import type { HistoriqueDepenses } from '../components/models/HistoriqueDepenses'

export function useAjouterDepense(balances: Ref<number[]>) {
  const indexDepenseur = ref(0)
  const montant = ref(0)
  const bénéficiaires = ref<number[]>([])

  function ajouterDepense() {
    const montantParBénéficiaire = montant.value / bénéficiaires.value.length

    bénéficiaires.value.forEach((indexBénéficiaire: number) => {
      balances.value[indexBénéficiaire] -= montantParBénéficiaire
    })
    balances.value[indexDepenseur.value] += montant.value

    historiqueDépenses.value.push({
      indexDépenseur: indexDepenseur.value,
      montant: montant.value,
      listeIndexesBénéficiares: bénéficiaires.value
    })
  }

  const historiqueDépenses = ref<HistoriqueDepenses>([])

  return { indexDepenseur, montant, bénéficiaires, ajouterDepense, historiqueDépenses }
}
