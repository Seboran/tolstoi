import { expect, test } from '@playwright/test'

const colorSchemes = ['light', 'dark'] as const

for (const colorScheme of colorSchemes) {
  test.describe(`${colorScheme} mode`, async () => {
    test.use({
      colorScheme,
    })

    test('visual regression', async ({ page }) => {
      await page.goto('/')
      await page.waitForTimeout(1000) // wait for animation
      await expect(page).toHaveScreenshot()
    })
  })
}
