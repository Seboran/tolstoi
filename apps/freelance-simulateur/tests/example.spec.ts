import { test, expect } from '@playwright/test'

test("parcours simple d'estimation", async ({ page }) => {
  await page.goto('/')

  await expect(page.locator('h1')).toContainText('Simulateur de revenus freelancing vs salariat')
  await page.getByRole('heading', { name: 'Développeur·euse' }).click()
  await expect(
    page.getByRole('heading', { name: 'Combien facturer en tant que Développeur·euse' }),
  ).toBeVisible()
  await expect(page.locator('#root')).toContainText('40 000 €')
  await expect(page.locator('#root')).toContainText('333 €')
  await page.getByRole('slider').first().fill('54000')
  await expect(page.locator('#root')).toContainText('54 000 €')
  await expect(page.locator('#root')).toContainText('449 €')
  await expect(page.getByText('Attention, avec 176 jours')).toBeVisible()
  await page.getByRole('button', { name: 'Voir et modifier les paramè' }).click()
  await expect(page.getByRole('heading', { name: 'Nombre de jours facturés' })).toBeVisible()
  await page.getByRole('button', { name: 'M' }).nth(2).click()
  await expect(page.getByText('54 000 €', { exact: true })).toBeVisible()
  await expect(page.getByText('577 €', { exact: true })).toBeVisible()
  await page.locator('section').filter({ hasText: 'Frais' }).getByRole('slider').fill('550')
  await expect(page.getByText('648 €', { exact: true })).toBeVisible()
  await expect(page.getByText('54 000 €', { exact: true })).toBeVisible()
})
