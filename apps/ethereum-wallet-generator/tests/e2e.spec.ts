import { expect, test } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('textbox', { name: 'Address prefix' }).click()
  await page.getByRole('textbox', { name: 'Address prefix' }).fill('14')
  await page.getByRole('textbox', { name: 'Address suffix' }).click()
  await page.getByRole('textbox', { name: 'Address suffix' }).fill('d')
  await page.getByRole('button', { name: 'GENERATE' }).click()
  await expect(page.getByRole('textbox', { name: 'Ethereum address' })).toHaveValue(/0x14.*d/, {
    timeout: 20000,
  })
})
