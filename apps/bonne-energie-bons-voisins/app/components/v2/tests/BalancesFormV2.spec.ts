import BalancesFormV2 from '@/components/v2/BalancesFormV2.vue'
import userEvent from '@testing-library/user-event'
import { render, waitFor } from '@testing-library/vue'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import type { BalanceSolutionResponse } from '~/composables/useFetchBalances'

vi.mock('@/components/useFetchBalances', () => ({
  fetchBalances: vi.fn().mockResolvedValue({
    result_matrix: [
      [0, 1, 0],
      [0, 0, 1],
      [0, 0, 0],
    ],
  } as BalanceSolutionResponse),
}))

describe("Affiche les balances et permet d'ajouter des dépenses", () => {
  beforeEach(() => {
    useBalancesEtRemboursementsStore().$reset()
  })
  test('Permet de renseigner 3 personnes à rembourser', async () => {
    const { queryAllByRole, getByRole } = render(BalancesFormV2)

    expect(queryAllByRole('textbox')).toHaveLength(0)
    await userEvent.click(getByRole('button', { name: 'Ajouter une personne' }))
    expect(queryAllByRole('textbox')).toHaveLength(1)
    await userEvent.click(getByRole('button', { name: 'Ajouter une personne' }))
    expect(queryAllByRole('textbox')).toHaveLength(2)
    await userEvent.click(getByRole('button', { name: 'Ajouter une personne' }))
    expect(queryAllByRole('textbox')).toHaveLength(3)
  })

  test.todo(
    'Après avoir ajouté 3 personnes, permet de renseigner leurs sommes dépensées',
    async () => {
      const { getAllByRole, getByRole } = render(BalancesFormV2)

      await userEvent.click(getByRole('button', { name: 'Ajouter une personne' }))
      await userEvent.click(getByRole('button', { name: 'Ajouter une personne' }))
      await userEvent.click(getByRole('button', { name: 'Ajouter une personne' }))

      const premièreBalance = getAllByRole('spinbutton')[0]
      const deuxièmeBalance = getAllByRole('spinbutton')[1]
      const troisièmeBalance = getAllByRole('spinbutton')[2]

      await userEvent.type(premièreBalance, '30')
      await userEvent.type(deuxièmeBalance, '45')
      await userEvent.type(troisièmeBalance, '200')

      await userEvent.click(getByRole('button', { name: 'Calculer remboursements' }))

      const tableauRemboursements = getByRole('table', { name: 'Remboursements' })
      await waitFor(() => {
        expect(tableauRemboursements.textContent).toEqual(
          'quidoità quiUn castor affairé1€Une autruche curieuseUne autruche curieuse1€Un ornithorynque malicieux',
        ),
          { timeout: 2000 }
      })
    },
  )

  test('Après avoir ajouté 3 personnes, vider les résultats quand on retire une personne', async () => {
    const { getAllByRole, getByRole, queryByRole } = render(BalancesFormV2)

    await userEvent.click(getByRole('button', { name: 'Ajouter une personne' }))
    await userEvent.click(getByRole('button', { name: 'Ajouter une personne' }))
    await userEvent.click(getByRole('button', { name: 'Ajouter une personne' }))

    const premièreBalance = getAllByRole('spinbutton')[0]
    const deuxièmeBalance = getAllByRole('spinbutton')[1]
    const troisièmeBalance = getAllByRole('spinbutton')[2]

    await userEvent.type(premièreBalance, '30')
    await userEvent.type(deuxièmeBalance, '45')
    await userEvent.type(troisièmeBalance, '200')

    await userEvent.click(getByRole('button', { name: 'Calculer remboursements' }))

    await userEvent.click(getAllByRole('button', { name: 'delete' })[2])

    expect(queryByRole('table', { name: '' })).toBeNull()
  })
})
