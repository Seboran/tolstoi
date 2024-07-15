import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Créer une session' }).click()
  await page.getByRole('button', { name: 'Ajouter une personne' }).click()
  await page.getByRole('button', { name: 'Ajouter une personne' }).click()
  await page.getByRole('button', { name: 'Ajouter une personne' }).click()
  await page.getByRole('textbox').nth(1).click({
    clickCount: 3
  })
  await page.getByRole('textbox').nth(1).fill('NIRINA')

  await page.getByLabel('Dépenseur').selectOption('NIRINA')
  await page.getByRole('checkbox', { name: 'Un castor affairé' }).click()
  await page.getByRole('checkbox', { name: 'NIRINA' }).click()
  await page.getByRole('checkbox', { name: 'Un ornithorynque malicieux' }).click()
  await page.getByLabel('a dépensé').dblclick()
  await page.getByLabel('a dépensé').press('ArrowLeft')
  await page.getByLabel('a dépensé').fill('310')
  await page.getByRole('button', { name: 'Ajouter une dépense' }).click()
  await page.getByLabel('Dépenseur').selectOption('Un ornithorynque malicieux')
  await page.getByLabel('a dépensé').dblclick()
  await page.getByLabel('a dépensé').press('ControlOrMeta+a')
  await page.getByLabel('a dépensé').fill('218')
  await page.getByRole('button', { name: 'Ajouter une dépense' }).click()

  await expect(page.getByLabel('balance').nth(0)).toHaveValue('-176')
  await expect(page.getByLabel('balance').nth(1)).toHaveValue('134')
  await expect(page.getByLabel('balance').nth(2)).toHaveValue('42')
  await expect(page.getByTitle('Remboursements').getByRole('row').nth(0)).toHaveText(
    'Un castor affairé134€NIRINA',
    { timeout: 60000 }
  )
  await expect(page.getByTitle('Remboursements').getByRole('row').nth(1)).toHaveText(
    'Un castor affairé42€Un ornithorynque malicieux'
  )
  await expect(
    page.getByText(
      'NIRINA a dépensé 310€ pour Un castor affairé, NIRINA, Un ornithorynque malicieux'
    )
  ).toBeVisible()

  await expect(
    page.getByText(
      'Un ornithorynque malicieux a dépensé 218€ pour Un castor affairé, NIRINA, Un ornithorynque malicieux'
    )
  ).toBeVisible()
})
