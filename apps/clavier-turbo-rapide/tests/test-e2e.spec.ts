import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('Zone de texte').click()
  const textAFrapper = 'amour gloire beauté pâtée champignons brun'
  for (const caractere of textAFrapper) {
    await page.keyboard.type(caractere)
  }
  await page.getByLabel('Zone de texte').press('Escape')

  for (const caractere of textAFrapper) {
    await page.keyboard.type(caractere)
  }
  await expect(page.getByLabel('Zone de texte')).toHaveValue(
    'amour gloire beauté pâtée champignons brun',
  )
})
