import type { HistoriqueDepenses } from './models/HistoriqueDepenses'

export interface IEnregistrementDepense {
  indexBeneficiaires: number[]
  montant: number
  indexDepenseur: number
}

export interface IHistoriqueDepenses {
  depense: IEnregistrementDepense[]
  noms: string[]
}

export async function createHistorique(historique: HistoriqueDepenses, noms: string[]) {
  const bodyRequest: IHistoriqueDepenses = {
    depense: historique.map((depense) => ({
      indexBeneficiaires: depense.listeIndexesBénéficiares,
      montant: depense.montant,
      indexDepenseur: depense.indexDépenseur
    })),
    noms
  }
  const response = await fetch(`/api/historique`, {
    method: 'PUT',

    body: JSON.stringify(bodyRequest)
  })
  return (await response.json()) as { id: string; depenses: IEnregistrementDepense[] }
}

export async function updateHistorique(id: string, historique: HistoriqueDepenses, noms: string[]) {
  const bodyRequest: IHistoriqueDepenses = {
    depense: historique.map((depense) => ({
      indexBeneficiaires: depense.listeIndexesBénéficiares,
      montant: depense.montant,
      indexDepenseur: depense.indexDépenseur
    })),
    noms
  }
  const response = await fetch(`/api/historique?id=${id}`, {
    method: 'POST',

    body: JSON.stringify(bodyRequest)
  })
  return (await response.json()) as { id: string; depenses: IEnregistrementDepense[] }
}

export async function getHistorique(id: string) {
  const response = await fetch(`/api/historique?id=${id}`, {
    method: 'GET'
  })
  return (await response.json()) as IHistoriqueDepenses
}
