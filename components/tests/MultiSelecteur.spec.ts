import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/vue'
import { describe, expect, test } from 'vitest'
import MultiSelecteur from '../MultiSelecteur.vue'

describe('Multi sélection', () => {
  test('Sélectionner plusieurs personnes', async () => {
    const { getByRole, emitted } = render(MultiSelecteur, {
      props: {
        nomsBalances: ['arthur', 'eve', 'alice'],
        id: 'id',
        name: 'name',
        modelValue: []
      }
    })

    await userEvent.click(getByRole('checkbox', { name: 'arthur' }))
    await userEvent.click(getByRole('checkbox', { name: 'eve' }))
    await userEvent.click(getByRole('checkbox', { name: 'arthur' }))
    await userEvent.click(getByRole('checkbox', { name: 'alice' }))

    expect(emitted('update:modelValue').at(-1)).toEqual([[1, 2]])
  })
})
