import { test, expect } from '@playwright/experimental-ct-react'
import { InputMotsAEcrire } from '@/app/InputMotsAEcrire'

test('doit permettre de saisir le texte proposé', async ({ mount, page }) => {
  const component = await mount(
    <InputMotsAEcrire
      mots={['amour', 'gloire', 'beauté', 'pâtée', 'champignons', 'brun']}
    />,
  )

  await component.getByLabel('Zone de texte').click()

  const textAFrapper = 'amour gloire beauté pâtée champignons brun'
  for (const caractere of textAFrapper) {
    await page.keyboard.type(caractere)
  }
  await expect(component.getByLabel('Zone de texte')).toHaveValue(
    'amour gloire beauté pâtée champignons brun',
  )
})

test("doit afficher un message d'erreur quand on se trompe de caractère", async ({
  page,
  mount,
}) => {
  const component = await mount(
    <InputMotsAEcrire
      mots={['amour', 'gloire', 'beauté', 'pâtée', 'champignons', 'brun']}
    />,
  )
  await component.getByLabel('Zone de texte').click()

  const textAFrapper = 'amour gloire beauti'
  for (const caractere of textAFrapper) {
    await page.keyboard.type(caractere)
  }
  await expect(component.getByLabel('Zone de texte')).toHaveValue(
    'amour gloire beaut',
  )

  await expect(component.getByText('Erreur de saisie !')).toBeVisible()
})
