import { test, expect } from '@playwright/test'

test('test-toute-utilisation', async ({ page }) => {
  await page.goto('/')
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

  await expect(page.getByText(/Un castor affairé.*Un ornithorynque malicieux/)).toBeVisible()
  await expect(page.getByText(/Un castor affairé.*Un panda joueur/)).toBeVisible()
  await expect(page.getByText(/Une autruche curieuse.*Un panda joueur/)).toBeVisible()
  await expect(page.getByText(/Un paresseux rêveur.*Un ornithorynque malicieux/)).toBeVisible()
  await expect(page.getByText(/Un paresseux rêveur.*Un koala gourmand/)).toBeVisible()
})

test('test ajout et suppresion de personnes', async ({ page }) => {
  await page.goto('/')
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

  await page.getByRole('button', { name: 'supprimer' }).nth(1).click()

  await expect(page.getByText(/Un castor affairé.*Un ornithorynque malicieux/)).not.toBeVisible()
  await expect(page.getByText(/Un castor affairé.*Un koala gourmand/)).not.toBeVisible()
  await expect(page.getByText(/Un castor affairé.*Un panda joueur/)).not.toBeVisible()
  await expect(
    page.getByText(/Une autruche curieuse.*Un ornithorynque malicieux/)
  ).not.toBeVisible()
  await expect(page.getByText(/Une autruche curieuse.*Un koala gourmand/)).not.toBeVisible()
  await expect(page.getByText(/Une autruche curieuse.*Un panda joueur/)).not.toBeVisible()
  await expect(page.getByText(/Un paresseux rêveur.*Un ornithorynque malicieux/)).not.toBeVisible()
  await expect(page.getByText(/Un paresseux rêveur.*Un koala gourmand/)).not.toBeVisible()
  await expect(page.getByText(/Un paresseux rêveur.*Un panda joueur/)).not.toBeVisible()
})
