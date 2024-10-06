import userEvent from '@testing-library/user-event'
import { render, waitFor } from '@testing-library/vue'
import { describe, expect, test, vi } from 'vitest'
import BalancesForm from '../BalancesForm.vue'
import type { BalanceSolutionResponse } from '../useFetchBalances'

vi.mock('@/components/useFetchBalances', () => ({
  fetchBalances: vi.fn().mockResolvedValue({
    result_matrix: [
      [0, 1, 0],
      [0, 0, 1],
      [0, 0, 0]
    ]
  } as BalanceSolutionResponse)
}))
describe('Afficher version 1 des balances', () => {
  test('Permet de renseigner 3 personnes à rembourser', async () => {
    const { queryAllByRole, getByRole } = render(BalancesForm)

    expect(queryAllByRole('textbox')).toHaveLength(0)
    await userEvent.click(getByRole('button', { name: 'Ajouter une personne' }))
    expect(queryAllByRole('textbox')).toHaveLength(1)
    await userEvent.click(getByRole('button', { name: 'Ajouter une personne' }))
    expect(queryAllByRole('textbox')).toHaveLength(2)
    await userEvent.click(getByRole('button', { name: 'Ajouter une personne' }))
    expect(queryAllByRole('textbox')).toHaveLength(3)
  })

  test('Après avoir ajouté 3 personnes, permet de renseigner leurs sommes dépensées', async () => {
    const { getByRole } = render(BalancesForm)

    await userEvent.click(getByRole('button', { name: 'Ajouter une personne' }))
    await userEvent.click(getByRole('button', { name: 'Ajouter une personne' }))
    await userEvent.click(getByRole('button', { name: 'Ajouter une personne' }))

    await userEvent.selectOptions(getByRole('combobox'), ['Une autruche curieuse'])

    await userEvent.type(getByRole('spinbutton', { name: 'a dépensé' }), '230')

    await userEvent.click(getByRole('checkbox', { name: 'Un castor affairé' }))
    await userEvent.click(getByRole('checkbox', { name: 'Un ornithorynque malicieux' }))

    await userEvent.click(getByRole('button', { name: 'Ajouter une dépense' }))

    const tableauRemboursements = getByRole('table', { name: '' })
    await waitFor(
      () => {
        expect(tableauRemboursements.textContent).toEqual(
          'quidoità quiUn castor affairé1€Une autruche curieuseUne autruche curieuse1€Un ornithorynque malicieux'
        )
      },
      {
        timeout: 2000
      }
    )
  })
})
