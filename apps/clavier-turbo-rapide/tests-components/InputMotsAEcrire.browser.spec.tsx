import { test, expect } from 'vitest'
import { InputMotsAEcrire } from '../app/InputMotsAEcrire'
import { userEvent } from '@vitest/browser/context'
import { render } from 'vitest-browser-react'

test('doit permettre de saisir le texte proposé', async () => {
  const { getByLabelText } = render(
    <InputMotsAEcrire
      mots={['amour', 'gloire', 'beauté', 'pâtée', 'champignons', 'brun']}
    />,
  )

  await getByLabelText('Zone de texte').click()

  const textAFrapper = 'amour gloire beauté pâtée champignons brun'
  await userEvent.type(getByLabelText('Zone de texte'), textAFrapper)
  await expect
    .element(getByLabelText('Zone de texte'))
    .toHaveValue('amour gloire beauté pâtée champignons brun')
})

test("doit afficher un message d'erreur quand on se trompe de caractère", async () => {
  const { getByLabelText, getByText } = render(
    <InputMotsAEcrire
      mots={['amour', 'gloire', 'beauté', 'pâtée', 'champignons', 'brun']}
    />,
  )
  await getByLabelText('Zone de texte').click()
  const textAFrapper = 'amour gloire beauti'
  await userEvent.type(getByLabelText('Zone de texte'), textAFrapper)

  await expect.element(getByText('Erreur de saisie !')).toBeVisible()
  await expect
    .element(getByLabelText('Zone de texte'))
    .toHaveValue('amour gloire beaut')
})
