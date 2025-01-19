import { render } from '@testing-library/vue'
import AffichageRemboursementsV2 from 'layer-bons-comptes/components/v2/AffichageRemboursementsV2.vue'
import { describe, expect, test } from 'vitest'

describe('Afficher la liste des remboursements', () => {
  test('afficher remboursement entre deux personnes', () => {
    const { getAllByRole } = render(AffichageRemboursementsV2, {
      props: {
        matriceDeRemboursements: [
          [0, 1, 0],
          [0, 0, 0],
          [0, 1, 0],
        ],
        nomsBalances: ['une vache', 'une poule', 'un guépard'],
      },
    })
    expect(getAllByRole('row').map((row) => row.textContent)).toEqual([
      'quidoità qui',
      'une vache1€une poule',
      'un guépard1€une poule',
    ])
  })
})
