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
    expect(screen.getByRole<HTMLTextAreaElement>('textbox').value).toEqual('une autruche rose')
    await userEvent.clear(screen.getByRole('textbox'))
    await userEvent.type(screen.getByRole('textbox'), 'un castor affairé')
    expect(emitted('update:name').at(-1)).toMatchObject(['un castor affairé'])
    expect(screen.getByRole<HTMLTextAreaElement>('textbox').value).toBe('un castor affairé')
  })
})
