export interface DepenseHistorisee {
  indexDépenseur: number
  montant: number
  listeIndexesBénéficiares: number[]
}

export type HistoriqueDepenses = DepenseHistorisee[]
