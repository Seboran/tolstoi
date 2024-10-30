import { render } from '@testing-library/vue'
import { describe, expect, test } from 'vitest'
import HistoriqueDepenses from '../HistoriqueDepenses.vue'

describe('Afficher historique des dépenses', () => {
  test('afficher liste de dépenses', () => {
    const { getAllByRole } = render(HistoriqueDepenses, {
      props: {
        historiqueDépenses: [
          {
            indexDépenseur: 0,
            montant: 230,
            listeIndexesBénéficiares: [0, 1, 2]
          },
          {
            indexDépenseur: 1,
            montant: 20,
            listeIndexesBénéficiares: [0, 1]
          }
        ],
        nomsBalances: ['Arthur', 'Gru', 'Minions']
      }
    })

    expect(getAllByRole('listitem')[0].textContent).toEqual(
      'Arthur a dépensé 230€ pour Arthur, Gru, Minions'
    )
    expect(getAllByRole('listitem')[1].textContent).toEqual('Gru a dépensé 20€ pour Arthur, Gru')
  })
})
