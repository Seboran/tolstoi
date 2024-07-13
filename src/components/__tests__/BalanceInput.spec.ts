import { userEvent } from '@testing-library/user-event'
import { render, screen } from '@testing-library/vue'
import { describe, expect, test } from 'vitest'
import BalanceInput from '../BalanceInput.vue'

describe('Balance input', () => {
  test('change balance and name', async () => {
    const { emitted } = render(BalanceInput, {
      props: {
        balance: 10,
        name: 'une autruche rose'
      }
    })

    expect(screen.getByRole('spinbutton', { name: 'balance de une autruche rose' }).value).toBe(
      '10'
    )
    await userEvent.clear(screen.getByRole('spinbutton', { name: 'balance de une autruche rose' }))
    await userEvent.type(
      screen.getByRole('spinbutton', { name: 'balance de une autruche rose' }),
      '20'
    )
    expect(emitted('update:balance').at(-1)).toMatchObject([20])
    expect(screen.getByRole('spinbutton', { name: 'balance de une autruche rose' }).value).toBe(
      '20'
    )
  })

  test('change name', async () => {
    const { emitted } = render(BalanceInput, {
      props: {
        balance: 10,
        name: 'une autruche rose'
      }
    })
    expect(
      screen.getByRole('textbox', { name: 'Modifier le nom de une autruche rose' }).value
    ).toBe('une autruche rose')
    await userEvent.clear(
      screen.getByRole('textbox', { name: 'Modifier le nom de une autruche rose' })
    )
    await userEvent.type(
      screen.getByRole('textbox', { name: 'Modifier le nom de' }),
      'un castor affairé'
    )
    expect(emitted('update:name').at(-1)).toMatchObject(['un castor affairé'])
    expect(
      screen.getByRole('textbox', { name: 'Modifier le nom de un castor affairé' }).value
    ).toBe('un castor affairé')
  })
})
