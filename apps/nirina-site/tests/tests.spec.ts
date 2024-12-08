import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Nirina Rabeson/)
})

test('get started link', async ({ page }, testInfo) => {
  if (testInfo.project.name.includes('Mobile')) {
    test.skip()
  }
  await page.goto('/')

  // Click the get started link.
  await page.getByRole('link', { name: 'Me contacter' }).click()
  await page.getByRole('link', { name: /LinkedIn/ }).click()

  // Expects page to have a heading with the name of Installation.
  await expect(page).toHaveURL(/https:\/\/www\.linkedin\.com\/*/)
})

test('get started link on mobile', async ({ page }, testInfo) => {
  if (!testInfo.project.name.includes('Mobile')) {
    test.skip()
  }
  await page.goto('/')

  // Click the get started link.

  await page.getByLabel('Toggle navigation menu').click()
  await page.getByRole('link', { name: 'Me contacter' }).click()
  await page.getByRole('link', { name: /LinkedIn/ }).click()

  // Expects page to have a heading with the name of Installation.
  await expect(page).toHaveURL(/https:\/\/www\.linkedin\.com\/*/)
})

test.skip("affiche le titre d'un article et permet de cliquer dessus", async ({
  page,
}) => {
  await page.goto('/')
  const textContent = await page
    .getByRole('heading')
    .getByRole('link')
    .first()
    .textContent()
  await page.getByRole('heading').getByRole('link').first().click()

  await expect(page).toHaveURL(/\/posts\/*/)
  await expect(page).toHaveTitle(new RegExp(textContent! + ' | Nirina Rabeson'))
})

test('affiche 404', async ({ page }) => {
  await page.goto('/jemesuisperduetjedevraispasetreici2388394')
  await expect(page.getByText('404')).toBeVisible()
})

test.describe("Chat dans l'accueil", () => {
  test('affiche une zone de chat avec autofocus', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('textbox')).toBeFocused()
  })

  test('permet de lire le dernier article de blog', async ({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(1000)
    await page
      .getByRole('button')
      .getByText(/Je voudrais lire le dernier article de blog/)
      .click()
    await page.waitForURL('**/posts/**')
    expect(page.url()).toMatch(/\/posts\/.+/)
  })

  test('permet de prendre contact en tapant à la main', async ({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(1000)

    await page.getByRole('textbox').fill('Je voudrais prendre contact')
    await page.getByLabel('Envoyer message').click()
    await page.waitForURL('**/contact/')
    expect(page.url()).toMatch(/\/contact/)
  })

  test('permet de prendre contact en appuyant ensuite sur enter', async ({
    page,
  }) => {
    await page.goto('/')
    await page.waitForTimeout(1000)

    await page
      .getByRole('textbox')
      .pressSequentially('Je voudrais prendre contact')
    await page.keyboard.press('Enter')
    await page.waitForURL('**/contact/')
    expect(page.url()).toMatch(/\/contact/)
  })
})
