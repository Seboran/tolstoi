import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/vue'
import { expect, suite, test } from 'vitest'

import SudokuAfficherCellule from '../SudokuAfficherCellule.vue'

suite('SudokuAfficherCellule.test.ts', () => {
  test('Affiche la valeur envoyée à la cellule dans un input disabled', () => {
    const { getByRole } = render(SudokuAfficherCellule, {
      props: {
        modelValue: 5,
        possibilites: [],
      },
    })
    const inputCell = getByRole('spinbutton') as HTMLInputElement
    expect(inputCell.attributes).toHaveProperty('disabled')
    expect(inputCell.value).toEqual('5')
  })

  test('La cellule est modifiable quand elle reçoit un zéro, puis devient disabled', async () => {
    const { getByRole, emitted, rerender } = render(SudokuAfficherCellule, {
      props: {
        modelValue: 0,
        possibilites: [5, 4],
      },
    })
    const inputCell = getByRole('spinbutton') as HTMLInputElement

    await userEvent.type(inputCell, '5')
    expect(inputCell.value).toEqual('5')
    expect(emitted()).toHaveProperty('update:modelValue')
    const emittedNewValueArray = emitted('update:modelValue')[0] as number[]
    expect(emittedNewValueArray).toEqual([5])
    await rerender({ modelValue: emittedNewValueArray[0] })
    expect(inputCell.attributes).toHaveProperty('disabled')
  })

  test('La cellule reste modifiable quand elle reçoit une valeur non présente dans les possibilités', async () => {
    const { getByRole, emitted } = render(SudokuAfficherCellule, {
      props: {
        modelValue: 0,
        possibilites: [5, 4],
      },
    })
    const inputCell = getByRole('spinbutton') as HTMLInputElement
    await userEvent.type(inputCell, '3')
    expect(emitted('update:modelValue')[0]).toEqual([0])
    expect(inputCell.attributes).not.toHaveProperty('disabled')
  })

  test('La cellule refuse une valeur non nombre', async () => {
    const { getByRole, emitted } = render(SudokuAfficherCellule, {
      props: {
        modelValue: 0,
        possibilites: [5, 4],
      },
    })
    const inputCell = getByRole('spinbutton') as HTMLInputElement
    await userEvent.type(inputCell, 'a')
    expect(emitted()).not.toHaveProperty('update:modelValue')
    expect(inputCell.attributes).not.toHaveProperty('disabled')
  })
})
