import { test, expect } from '@playwright/test'

test('test-toute-utilisation', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Ajouter une personne' }).click()
  await page.getByRole('button', { name: 'Ajouter une personne' }).click()
  await page.getByRole('button', { name: 'Ajouter une personne' }).click()
  await page.getByRole('button', { name: 'Ajouter une personne' }).click()
  await page.getByRole('button', { name: 'Ajouter une personne' }).click()
  await page.getByRole('cell', { name: 'Un castor affairé' }).getByRole('spinbutton').click()
  await page.getByRole('cell', { name: 'Un castor affairé' }).getByRole('spinbutton').fill('50')
  await page.getByRole('cell', { name: 'Une autruche curieuse' }).getByRole('spinbutton').click()
  await page.getByRole('cell', { name: 'Une autruche curieuse' }).getByRole('spinbutton').fill('31')
  await page.getByRole('button', { name: 'Ajouter une personne' }).click()
  await page
    .getByRole('row', { name: 'Un ornithorynque malicieux' })
    .getByRole('spinbutton')
    .click()
  await page
    .getByRole('row', { name: 'Un ornithorynque malicieux' })
    .getByRole('spinbutton')
    .fill('200')
  await page.getByRole('cell', { name: 'Un koala gourmand' }).getByRole('spinbutton').click()
  await page.getByRole('cell', { name: 'Un koala gourmand' }).getByRole('spinbutton').fill('21')
  await page.getByRole('button', { name: 'Ajouter une personne' }).click()
  await page.getByRole('button', { name: 'Calculer remboursements' }).click()
  await expect(page.locator('section').filter({ hasText: 'quidoità quiUne' })).toHaveText(
    'quidoità quiUne autruche curieuse6.86€Un castor affairéUne autruche curieuse5.29€Un ornithorynque malicieuxUn paresseux rêveur43.14€Un ornithorynque malicieuxUn koala gourmand22.14€Un ornithorynque malicieuxUn panda joueur43.14€Un ornithorynque malicieuxUn loup solitaire43.14€Un ornithorynque malicieux'
  )
})
