import { userEvent } from '@testing-library/user-event'
import { render, screen } from '@testing-library/vue'
import { describe, expect, test } from 'vitest'
import BalanceInput from '../BalanceInput.vue'

describe('Balance input', () => {
  test('change name', async () => {
    const { emitted } = render(BalanceInput, {
      props: {
        balance: 10,
        name: 'une autruche rose'
      }
    })
    expect(screen.getByRole('textbox', { name: 'Nom' }).value).toBe('une autruche rose')
    await userEvent.clear(screen.getByRole('textbox', { name: 'Nom' }))
    await userEvent.type(screen.getByRole('textbox', { name: 'Nom' }), 'un castor affairé')
    expect(emitted('update:name').at(-1)).toMatchObject(['un castor affairé'])
    expect(screen.getByRole('textbox', { name: 'Nom' }).value).toBe('un castor affairé')
  })
})
