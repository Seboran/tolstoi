import { renderSuspended } from '@nuxt/test-utils/runtime'
import userEvent from '@testing-library/user-event'

import { describe, expect, test } from 'vitest'
import App from '../app.vue'

describe('choisi le mode', () => {
  test('affiche balance simple sans cliquer sur le bouton avancé', async () => {
    const { queryByRole, getByRole } = await renderSuspended(App)
    await userEvent.click(getByRole('button', { name: 'Ajouter une personne' }))
    expect(queryByRole('button', { name: 'delete' })).not.toBeNull()
  })
  test('affiche balance simple sans cliquer sur le bouton avancé', async () => {
    const { queryByRole, getByRole, getByText } = await renderSuspended(App)
    await userEvent.click(getByText('Mode détaillé'))
    await userEvent.click(getByRole('button', { name: 'Ajouter une personne' }))
    expect(queryByRole('button', { name: 'delete' })).toBeNull()
  })
})
