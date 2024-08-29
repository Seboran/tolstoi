import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('/v2')
  await page.getByRole('button', { name: 'Ajouter une personne' }).click()
  await page.getByRole('button', { name: 'Ajouter une personne' }).click()
  await page.getByRole('button', { name: 'Ajouter une personne' }).click()
  await page.getByRole('button', { name: 'Ajouter une personne' }).click()
  await page.getByRole('button', { name: 'Ajouter une personne' }).click()
  await page.getByRole('button', { name: 'Ajouter une personne' }).click()
  await page
    .getByRole('cell', { name: 'Nom Un castor affairé Dépense' })
    .getByRole('spinbutton')
    .click()
  await page
    .getByRole('cell', { name: 'Nom Un castor affairé Dépense' })
    .getByRole('spinbutton')
    .fill('20')
  await page
    .getByRole('cell', { name: 'Nom Un castor affairé Dépense' })
    .getByRole('spinbutton')
    .press('Tab')
  await page
    .getByRole('cell', { name: 'Nom Une autruche curieuse Dé' })
    .getByRole('spinbutton')
    .fill('26.7')
  await page
    .getByRole('cell', { name: 'Nom Une autruche curieuse Dé' })
    .getByRole('spinbutton')
    .press('Tab')
  await page.getByRole('cell', { name: 'Nom Un ornithorynque' }).getByLabel('Nom').press('Tab')
  await page.getByRole('cell', { name: 'Nom Un ornithorynque' }).getByRole('spinbutton').fill('45')
  await page
    .getByRole('cell', { name: 'Nom Un ornithorynque' })
    .getByRole('spinbutton')
    .press('Tab')
  await page.getByRole('row', { name: 'Nom Un paresseux rêveur Dé' }).getByLabel('Nom').press('Tab')
  await page
    .getByRole('row', { name: 'Nom Un paresseux rêveur Dé' })
    .getByRole('spinbutton')
    .press('Tab')
  await page
    .getByRole('cell', { name: 'Nom Un koala gourmand Dépense' })
    .getByLabel('Nom')
    .press('Tab')
  await page
    .getByRole('cell', { name: 'Nom Un koala gourmand Dépense' })
    .getByRole('spinbutton')
    .fill('36')
  await page
    .getByRole('cell', { name: 'Nom Un koala gourmand Dépense' })
    .getByRole('spinbutton')
    .press('Tab')
  await page
    .getByRole('cell', { name: 'Nom Un panda joueur Dépense' })
    .getByLabel('Nom')
    .press('Tab')
  await page
    .getByRole('cell', { name: 'Nom Un panda joueur Dépense' })
    .getByRole('spinbutton')
    .fill('34')
  await page.getByRole('button', { name: 'Calculer remboursements' }).click()
  await page.getByRole('cell', { name: 'Nom Une autruche curieuse Dé' }).getByLabel('Nom').click({
    clickCount: 3
  })

  await expect(page.getByText('Un castor affairé5.66€Un ornithorynque malicieux')).toBeVisible()
  await expect(page.getByText('Un castor affairé1.09€Un koala gourmand')).toBeVisible()
  await expect(page.getByText('Un castor affairé0.2€Un panda joueur')).toBeVisible()
  await expect(page.getByText('Une autruche curieuse0.01€Un ornithorynque malicieux')).toBeVisible()
  await expect(page.getByText('Une autruche curieuse0.15€Un koala gourmand')).toBeVisible()
  await expect(page.getByText('Une autruche curieuse0.09€Un panda joueur')).toBeVisible()
  await expect(page.getByText('Un paresseux rêveur12.38€Un ornithorynque malicieux')).toBeVisible()
  await expect(page.getByText('Un paresseux rêveur7.81€Un koala gourmand')).toBeVisible()
  await expect(page.getByText('Un paresseux rêveur6.76€Un panda joueur')).toBeVisible()
})
