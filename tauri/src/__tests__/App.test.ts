import userEvent from '@testing-library/user-event'
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

const clipBoard = vi.fn()
vi.mock('@vueuse/core', async (importOriginal) => {
  const actual = (await importOriginal()) as any
  return {
    ...actual,
    useClipboard: () => ({
      copy: clipBoard
    })
  }
})

suite('App.vue', () => {
  suite('affichage', () => {
    test('Doit afficher 2 mots de passe entrées', async () => {
      const { findAllByRole } = render(App)

      const rows = await findAllByRole('row')
      expect(rows).toHaveLength(2)
    })

    test('Doit afficher la première entrée', async () => {
      const { findAllByRole } = render(App)

      const rows = await findAllByRole('row')
      expect(rows[0]).toHaveTextContent('laredoute.fr')
    })

    test('Doit afficher la deuxième entrée', async () => {
      const { findAllByRole } = render(App)

      const rows = await findAllByRole('row')
      expect(rows[1]).toHaveTextContent('impots')
    })
  })
  suite('copier-coller', () => {
    test('Doit copier coller les deux mots de passe', async () => {
      const { findByText } = render(App)

      const ligneLaRedoute = await findByText(/laredoute/)

      await fireEvent.click(ligneLaRedoute)

      await waitFor(() => expect(clipBoard).toHaveBeenCalledOnce())
    })
  })
  suite('filtrage', () => {
    test("Ne doit contenir plus que l'entrée laredoute", async () => {
      const { findByRole } = render(App)
      await userEvent.type(await findByRole('searchbox', { name: /Chercher entrée/i }), 'redoute')
      const entreeLaRedoute = await findByRole('row')
      expect(entreeLaRedoute).toHaveTextContent('laredoute')
    })
  })
})
