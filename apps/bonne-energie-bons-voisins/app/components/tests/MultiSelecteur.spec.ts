import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/vue'
import { describe, expect, test } from 'vitest'
import MultiSelecteur from '@/components/MultiSelecteur.vue'

describe('Multi sélection', () => {
  test('Sélectionner plusieurs personnes', async () => {
    const { getByRole, emitted } = render(MultiSelecteur, {
      props: {
        nomsBalances: ['arthur', 'eve', 'alice'],
        id: 'id',
        name: 'name',
        modelValue: [],
      },
    })

    await userEvent.click(getByRole('checkbox', { name: 'alice' }))
    await userEvent.click(getByRole('checkbox', { name: 'arthur' }))
    await userEvent.click(getByRole('checkbox', { name: 'eve' }))
    await userEvent.click(getByRole('checkbox', { name: 'arthur' }))

    expect(new Set(emitted<number[][]>('update:modelValue').at(-1)!.at(0))).toEqual(new Set([1, 2]))
  })
  test('Sélectionner, changer des noms et resélectionner', async () => {
    const { getByRole, emitted, rerender } = render(MultiSelecteur, {
      props: {
        nomsBalances: ['arthur', 'eve', 'alice'],
        id: 'id',
        name: 'name',
        modelValue: [],
      },
    })

    await userEvent.click(getByRole('checkbox', { name: 'alice' }))
    await userEvent.click(getByRole('checkbox', { name: 'arthur' }))
    await userEvent.click(getByRole('checkbox', { name: 'eve' }))
    await userEvent.click(getByRole('checkbox', { name: 'arthur' }))
    await rerender({
      nomsBalances: ['arthur', 'eve', 'jean-claude'],
    })

    expect(getByRole<HTMLInputElement>('checkbox', { name: 'jean-claude' }).checked).toBe(true)
    expect(new Set(emitted<number[][]>('update:modelValue').at(-1)!.at(0))).toEqual(new Set([1, 2]))
  })
})
