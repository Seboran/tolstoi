import { fireEvent, render, waitFor } from '@testing-library/vue'
import { expect, suite, test, vi } from 'vitest'
import App from '../App.vue'

window.__TAURI_INVOKE__ = async (
  cmd: string,
  args?: Record<string, unknown>
): Promise<any | undefined> => {
  // simulated rust command called "add" that just adds two numbers
  if (cmd === 'list_entries') {
    const entries: string[] = ['laredoute.fr', 'impots']
    return entries
  }

  if (cmd === 'show_password') {
    const { name } = args as Record<string, any>
    switch (name) {
      case 'laredoute.fr':
        return 'motdepasselaredoute'
      case 'impots':
        return 'motdepasseimpots'
    }
  }
}

const clipBoard = vi.fn().mockImplementation(() => console.log('bonjour monsieur'))
vi.mock('@vueuse/core', () => ({
  useClipboard: () => ({
    copy: clipBoard
  })
}))

suite('App.vue', () => {
  suite('affichage', () => {
    test('Doit afficher 2 mots de passe entrées', async () => {
      const { findAllByRole } = render(App)

      const rows = await findAllByRole('row')
      expect(rows).toHaveLength(2)
    })

    test('Doit afficher contenir les deux entrées', async () => {
      const { findAllByRole } = render(App)

      const rows = await findAllByRole('row')
      expect(rows[0]).toHaveTextContent('laredoute.fr')
    })

    test('Doit afficher contenir les deux entrées', async () => {
      const { findAllByRole } = render(App)

      const rows = await findAllByRole('row')
      expect(rows[1]).toHaveTextContent('impots')
    })
  })
  suite('copier-coller', () => {
    test('Doit copier coller les deux mots de passe', async () => {
      const { findByRole } = render(App)

      const ligneLaRedoute = await findByRole('button', { name: 'Copy password of laredoute.fr' })

      await fireEvent.click(ligneLaRedoute)

      await waitFor(() => expect(clipBoard).toHaveBeenCalledOnce())
    })
  })
})
