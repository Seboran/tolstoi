import { fireEvent, render } from '@testing-library/vue'
import { expect, suite, test } from 'vitest'
import SudokuAfficherLigne from '../SudokuAfficherLigne.vue'

suite('SudokuAfficherLigne', () => {
  test('Contient une ligne', () => {
    const { queryByRole } = render(SudokuAfficherLigne, {
      props: {
        modelValue: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        possibilites: [[], [], [], [], [], [], [], [], []],
      },
    })
    const ligne = queryByRole('row')
    expect(ligne).not.toBeNull()
  })
  test('Affiche 9 inputs', () => {
    const { getAllByRole } = render(SudokuAfficherLigne, {
      props: {
        modelValue: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        possibilites: [[], [], [], [], [], [], [], [], []],
      },
    })
    const inputs: HTMLInputElement[] = getAllByRole('spinbutton')
    expect(inputs).toHaveLength(9)
    expect(inputs[0].value).toBe('1')
    expect(inputs[1].value).toBe('2')
    expect(inputs[2].value).toBe('3')
    expect(inputs[3].value).toBe('4')
    expect(inputs[4].value).toBe('5')
    expect(inputs[5].value).toBe('6')
    expect(inputs[6].value).toBe('7')
    expect(inputs[7].value).toBe('8')
    expect(inputs[8].value).toBe('9')
    // Tous les inputs sont disabled
    expect(inputs.flatMap((input) => input.attributes)).toContainEqual(
      expect.not.objectContaining({ name: 'disabled' }),
    )
  })
  test('Contient 3 cases non remplies', () => {
    const { getAllByRole } = render(SudokuAfficherLigne, {
      props: {
        modelValue: [1, 2, 3, 4, 5, 6, 0, 0, 0],
        possibilites: [[], [], [], [], [], [], [7, 8, 9], [7, 8, 9], [7, 8, 9]],
      },
    })
    const inputs: HTMLInputElement[] = getAllByRole('spinbutton')
    expect(inputs).toHaveLength(9)
    expect(inputs[0].value).toBe('1')
    expect(inputs[1].value).toBe('2')
    expect(inputs[2].value).toBe('3')
    expect(inputs[3].value).toBe('4')
    expect(inputs[4].value).toBe('5')
    expect(inputs[5].value).toBe('6')
    expect(inputs[5].attributes).toHaveProperty('disabled')
    expect(inputs[6].value).toBe('')
    expect(inputs[6].attributes).not.toHaveProperty('disabled')
    expect(inputs[7].value).toBe('')
    expect(inputs[7].attributes).not.toHaveProperty('disabled')
    expect(inputs[8].value).toBe('')
    expect(inputs[8].attributes).not.toHaveProperty('disabled')
  })
  test('Remplit une case', async () => {
    const { getAllByRole, emitted } = render(SudokuAfficherLigne, {
      props: {
        modelValue: [1, 2, 3, 4, 5, 6, 0, 0, 0],
        possibilites: [[], [], [], [], [], [], [7, 8, 9], [7, 8, 9], [7, 8, 9]],
      },
    })
    const inputs: HTMLInputElement[] = getAllByRole('spinbutton')
    const septiemeCase = inputs[6]

    expect(septiemeCase.value).toBe('')
    await fireEvent.update(septiemeCase, '7')
    expect(septiemeCase.value).toBe('7')
  })
})
