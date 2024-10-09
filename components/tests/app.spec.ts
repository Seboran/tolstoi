import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/vue'
import { describe, expect, test } from 'vitest'
import MainApp from '../MainApp.vue'

describe('choisi le mode', () => {
  test('affiche balance simple sans cliquer sur le bouton avancé', async () => {
    const { queryByRole, getByRole } = render(MainApp)
    await userEvent.click(getByRole('button', { name: 'Ajouter une personne' }))
    expect(queryByRole('button', { name: 'delete' })).not.toBeNull()
  })
  test('affiche balance simple sans cliquer sur le bouton avancé', async () => {
    const { queryByRole, getByRole } = render(MainApp)
    await userEvent.click(getByRole('checkbox'))
    await userEvent.click(getByRole('button', { name: 'Ajouter une personne' }))
    expect(queryByRole('button', { name: 'delete' })).toBeNull()
  })
})
