import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/vue'
import { describe, expect, test } from 'vitest'
import BalanceInputV2 from '../BalanceInputV2.vue'

describe('Affiche les balances et permet de les modifier', () => {
  test("Affiche l'argend que doit Alfred", () => {
    const { getByRole } = render(BalanceInputV2, {
      props: {
        name: 'Alfred',
        balance: 20
      }
    })

    expect(getByRole<HTMLInputElement>('textbox').value).toEqual('Alfred')
    expect(getByRole<HTMLInputElement>('spinbutton').value).toEqual((20).toString())
  })

  test("Mettre à jour l'argent que doit Alfred", async () => {
    const { getByRole, emitted } = render(BalanceInputV2, {
      props: {
        name: 'Alfred',
        balance: 20
      }
    })
    const nomInput = getByRole<HTMLInputElement>('textbox')
    const balanceInput = getByRole<HTMLInputElement>('spinbutton')

    await userEvent.clear(nomInput)
    await userEvent.type(nomInput, 'blbl')
    await userEvent.clear(balanceInput)
    await userEvent.type(balanceInput, '35')

    expect(emitted('update:name').at(-1)).toEqual(['blbl'])
    expect(emitted('update:balance').at(-1)).toEqual([35])
  })

  test('Émet un événement supprimer quand on clique sur la poubelle', async () => {
    const { getByRole, emitted } = render(BalanceInputV2, {
      props: {
        name: 'Alfred',
        balance: 20
      }
    })

    const deleteButton = getByRole('button', {
      name: 'delete'
    })

    await userEvent.click(deleteButton)

    expect(emitted('remove')).toEqual([[]])
  })
})
