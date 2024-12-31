import { test, expect } from '@playwright/test'

test.skip('test super avancé', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('tab', { name: 'Mode détaillé' }).click()
  await page.waitForURL('/detaille')
  await page.getByRole('button', { name: 'Ajouter une personne' }).click()
  await page.getByRole('button', { name: 'Ajouter une personne' }).click()
  await page.getByRole('button', { name: 'Ajouter une personne' }).click()
  await page.getByRole('button', { name: 'Ajouter une personne' }).click()
  await page.getByRole('button', { name: 'Ajouter une personne' }).click()
  await page.getByRole('button', { name: 'Ajouter une personne' }).click()
  await page.getByRole('button', { name: 'Ajouter une personne' }).click()
  await page.getByRole('button', { name: 'Ajouter une personne' }).click()
  await page.getByRole('button', { name: 'Ajouter une personne' }).click()
  await page.locator('input[name="Un castor affairé"]').click({
    clickCount: 3,
  })
  await page.locator('input[name="Un castor affairé"]').fill('Julien')
  await page.locator('input[name="Une autruche curieuse"]').dblclick()
  await page.locator('input[name="Une autruche curieuse"]').dblclick()
  await page.locator('input[name="Une autruche curieuse"]').click({
    clickCount: 3,
  })
  await page.locator('input[name="Une autruche curieuse"]').fill('Oscar')
  await page.locator('input[name="Un ornithorynque malicieux"]').click()
  await page.locator('input[name="Un ornithorynque malicieux"]').press('ControlOrMeta+a')
  await page.locator('input[name="Un ornithorynque malicieux"]').fill('Sophie')
  await page.locator('input[name="Un paresseux rêveur"]').click()
  await page.locator('input[name="Un paresseux rêveur"]').click({
    clickCount: 3,
  })
  await page.locator('input[name="Un paresseux rêveur"]').fill('Julie')
  await page.locator('input[name="Un koala gourmand"]').fill('Bob')
  await page.locator('input[name="Un panda joueur"]').fill('Enzo')
  await page.locator('input[name="Un loup solitaire"]').fill('Sarah')
  await page.locator('input[name="Un renard rusé"]').fill('Ni')
  await page.locator('input[name="Ni"]').fill('Nicolas')
  // await page.locator('input[name="Ni"]').press('Tab')
  await page.locator('input[name="Un chat malicieux"]').fill('Dieudonné')
  await page.getByLabel('Dépenseur').selectOption('1')
  await page.getByLabel('a dépensé').click()
  await page.getByLabel('a dépensé').fill('3200')
  await page.getByLabel('a dépensé').press('Tab')
  await page.getByLabel('Julien').check()
  await page.getByLabel('Julien').press('Tab')
  await page.getByLabel('Oscar').check()
  await page.getByLabel('Oscar').press('Tab')
  await page.getByLabel('Sophie').check()
  await page.getByLabel('Sophie').press('Tab')
  await page.getByLabel('Julie', { exact: true }).check()
  await page.getByLabel('Julie', { exact: true }).press('Tab')
  await page.getByLabel('Bob').check()
  await page.getByLabel('Bob').press('Tab')
  await page.getByLabel('Enzo').check()
  await page.getByLabel('Enzo').press('Tab')
  await page.getByLabel('Sarah').check()
  await page.getByLabel('Sarah').press('Tab')
  await page.getByLabel('Nicolas').check()
  await page.getByLabel('Nicolas').press('Tab')
  await page.getByLabel('Dieudonné').check()
  await page.getByLabel('Dieudonné').press('Tab')
  await page.getByRole('button', { name: 'Ajouter une dépense' }).click()
  await page.getByRole('button', { name: 'Ajouter une dépense' }).press('Shift+Tab')
  await page.getByLabel('Dieudonné').press('Shift+Tab')
  await page.getByLabel('Nicolas').press('Shift+Tab')
  await page.getByLabel('Sarah').uncheck()
  await page.getByLabel('Sarah').press('Shift+Tab')
  await page.getByLabel('Enzo').uncheck()
  await page.getByLabel('Dépenseur').selectOption('3')
  await page.getByLabel('Dépenseur').press('Tab')
  await page.getByLabel('a dépensé').fill('2200')
  await page.getByLabel('a dépensé').press('Enter')
  await page.getByRole('button', { name: 'Ajouter une dépense' }).click()
  await page.getByLabel('Enzo').check()
  await page.getByLabel('Dépenseur').selectOption('2')
  await page.getByLabel('a dépensé').click()
  await page.getByLabel('a dépensé').click()
  await page.getByLabel('a dépensé').dblclick()
  await page.getByLabel('a dépensé').click({
    clickCount: 4,
  })
  await page.getByLabel('a dépensé').fill('3000')
  await page.getByLabel('Enzo').uncheck()
  await page.getByRole('button', { name: 'Ajouter une dépense' }).click()
  await page.getByLabel('Dépenseur').selectOption('0')
  await page.getByLabel('Bob').uncheck()
  await page.getByLabel('Enzo').check()
  await page.getByLabel('a dépensé').click()
  await page.getByLabel('a dépensé').click()
  await page.getByLabel('a dépensé').dblclick()
  await page.getByLabel('a dépensé').press('ControlOrMeta+a')
  await page.getByLabel('a dépensé').fill('450')
  await page.getByRole('button', { name: 'Ajouter une dépense' }).click()
  await page.getByLabel('Dépenseur').selectOption('1')
  await page.getByLabel('Bob').check()
  await page.getByLabel('a dépensé').click()
  await page.getByLabel('a dépensé').dblclick()
  await page.getByLabel('a dépensé').press('ControlOrMeta+a')
  await page.getByLabel('a dépensé').fill('340')
  await page.getByRole('button', { name: 'Ajouter une dépense' }).click()
  await page.getByLabel('Sarah').check()
  await page.getByLabel('Julien').uncheck()
  await page.getByLabel('a dépensé').dblclick()
  await page.getByLabel('a dépensé').fill('500')
  await page.getByLabel('Dépenseur').selectOption('7')
  await page.getByRole('button', { name: 'Ajouter une dépense' }).click()
  await page.getByLabel('Dépenseur').selectOption('5')
  await page.getByLabel('Julien').check()
  await page.getByLabel('Enzo').uncheck()
  await page.getByLabel('a dépensé').click()
  await page.getByLabel('a dépensé').dblclick()
  await page.getByLabel('a dépensé').press('ControlOrMeta+a')
  await page.getByLabel('a dépensé').fill('400')
  await page.getByRole('button', { name: 'Ajouter une dépense' }).click()
  await page.getByLabel('Dépenseur').selectOption('6')
  await page.getByLabel('Sophie').uncheck()
  await page.getByLabel('Oscar').uncheck()
  await page.getByLabel('Julien').uncheck()
  await page.getByLabel('a dépensé').click()
  await page.getByLabel('a dépensé').press('ControlOrMeta+a')
  await page.getByLabel('a dépensé').fill('550')
  await page.getByRole('button', { name: 'Ajouter une dépense' }).click()
  await page.getByLabel('Dépenseur').selectOption('5')
  await page.getByLabel('Enzo').check()
  await page.getByLabel('Sophie').check()
  await page.getByLabel('a dépensé').click()
  await page.getByLabel('a dépensé').press('ControlOrMeta+a')
  await page.getByLabel('a dépensé').fill('120')
  await page.getByRole('button', { name: 'Ajouter une dépense' }).click()
  await page.getByLabel('Dépenseur').selectOption('4')
  await page.getByLabel('Oscar').check()
  await page.getByLabel('a dépensé').click()
  await page.getByLabel('a dépensé').press('ControlOrMeta+a')
  await page.getByLabel('a dépensé').fill('180')
  await page.getByRole('button', { name: 'Ajouter une dépense' }).click()
  await page.getByLabel('Dépenseur').selectOption('1')
  await page.getByLabel('a dépensé').click()
  await page.getByLabel('a dépensé').fill('240')
  await page.getByLabel('Julien').check()
  await page.getByLabel('Enzo').uncheck()
  await page.getByRole('button', { name: 'Ajouter une dépense' }).click()
  await page.getByLabel('Dépenseur').selectOption('4')
  await page.getByLabel('Dieudonné').uncheck()
  await page.locator('label').filter({ hasText: 'Nicolas' }).click()
  await page.getByLabel('Sarah').uncheck()
  await page.locator('label').filter({ hasText: 'Sophie' }).click()
  await page.getByLabel('a dépensé').click()
  await page.getByLabel('a dépensé').fill('2400')
  await page.getByRole('button', { name: 'Ajouter une dépense' }).click()
  await page.getByLabel('Dépenseur').selectOption('0')
  await page.getByLabel('a dépensé').click()
  await page.locator('label').filter({ hasText: 'Enzo' }).click()
  await page.getByLabel('Sarah').check()
  await page.getByLabel('Oscar').uncheck()
  await page.getByLabel('Sophie').check()
  await page.getByLabel('a dépensé').click()
  await page.getByLabel('a dépensé').fill('1900')
  await page.getByRole('button', { name: 'Ajouter une dépense' }).click()
  await page.getByLabel('Dieudonné').check()
  await page.getByLabel('a dépensé').click()
  await page
    .locator('div')
    .filter({ hasText: 'DépenseurJulienOscarSophieJulieBobEnzoSarahNicolasDieudonné' })
    .nth(3)
    .click()
  await page.getByLabel('Dépenseur').selectOption('8')
  await page.getByLabel('a dépensé').dblclick()
  await page.getByLabel('a dépensé').fill('660')
  await page.getByRole('button', { name: 'Ajouter une dépense' }).click()
  await page.getByLabel('Dépenseur').selectOption('7')
  await page.getByLabel('a dépensé').click()
  await page.getByLabel('a dépensé').fill('400')
  await page.getByLabel('Oscar').check()
  await page.getByLabel('Julien').uncheck()
  await page.getByLabel('Nicolas').check()
  await page.getByRole('button', { name: 'Ajouter une dépense' }).click()
  await page.getByLabel('Dépenseur').selectOption('4')
  await page.getByLabel('Julien').check()
  await page.getByLabel('a dépensé').click()
  await page.getByLabel('a dépensé').fill('900')
  await page.getByRole('button', { name: 'Ajouter une dépense' }).click()
  await page.getByLabel('Dépenseur').selectOption('8')
  await page.getByLabel('a dépensé').click()
  await page.getByLabel('a dépensé').fill('500')
  await page.getByLabel('Julien').uncheck()
  await page.getByLabel('Julie', { exact: true }).uncheck()
  await page.getByLabel('Enzo').uncheck()
  await page.getByLabel('Sarah').uncheck()
  await page.getByRole('button', { name: 'Ajouter une dépense' }).click()

  await expect(page.getByTitle('Remboursements').getByRole('row')).toHaveText([
    'quidoità qui',
    'Julien46.15€Sophie',
    'Julie458.29€Oscar',
    'Enzo605.44€Bob',
    'Sarah658.65€Sophie',
    'Nicolas847.34€Oscar',
    'Dieudonné254.17€Oscar',
    'Dieudonné246.9€Sophie',
    'Dieudonné180.56€Bob',
  ])

  await expect(page.getByRole('list').getByRole('listitem')).toHaveText([
    'Oscar a dépensé 3200€ pour Julien, Oscar, Sophie, Julie, Bob, Enzo, Sarah, Nicolas, Dieudonné',
    'Julie a dépensé 2200€ pour Julien, Oscar, Sophie, Julie, Bob, Nicolas, Dieudonné',
    'Sophie a dépensé 3000€ pour Julien, Oscar, Sophie, Julie, Bob, Nicolas, Dieudonné',
    'Julien a dépensé 450€ pour Julien, Oscar, Sophie, Julie, Nicolas, Dieudonné, Enzo',
    'Oscar a dépensé 340€ pour Julien, Oscar, Sophie, Julie, Nicolas, Dieudonné, Enzo, Bob',
    'Nicolas a dépensé 500€ pour Oscar, Sophie, Julie, Nicolas, Dieudonné, Enzo, Bob, Sarah',
    'Enzo a dépensé 400€ pour Oscar, Sophie, Julie, Nicolas, Dieudonné, Bob, Sarah, Julien',
    'Sarah a dépensé 550€ pour Julie, Nicolas, Dieudonné, Bob, Sarah',
    'Enzo a dépensé 120€ pour Julie, Nicolas, Dieudonné, Bob, Sarah, Enzo, Sophie',
    'Bob a dépensé 180€ pour Julie, Nicolas, Dieudonné, Bob, Sarah, Enzo, Sophie, Oscar',
    'Oscar a dépensé 240€ pour Julie, Nicolas, Dieudonné, Bob, Sarah, Sophie, Oscar, Julien',
    'Bob a dépensé 2400€ pour Julie, Bob, Oscar, Julien',
    'Julien a dépensé 1900€ pour Julie, Bob, Julien, Enzo, Sarah, Sophie',
    'Dieudonné a dépensé 660€ pour Julie, Bob, Julien, Enzo, Sarah, Sophie, Dieudonné',
    'Nicolas a dépensé 400€ pour Julie, Bob, Enzo, Sarah, Sophie, Dieudonné, Oscar, Nicolas',
    'Bob a dépensé 900€ pour Julie, Bob, Enzo, Sarah, Sophie, Dieudonné, Oscar, Nicolas, Julien',
    'Dieudonné a dépensé 500€ pour Bob, Sophie, Dieudonné, Oscar, Nicolas',
  ])
})

test.skip('test rapide', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('tab', { name: 'Mode détaillé' }).click()
  await page.waitForURL('/detaille')
  await page.getByRole('button', { name: 'Ajouter une personne' }).click()
  await page.getByRole('button', { name: 'Ajouter une personne' }).click()
  await page.getByRole('button', { name: 'Ajouter une personne' }).click()
  await page.getByRole('textbox').nth(1).click({
    clickCount: 3,
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

  await expect(page.getByTitle('Remboursements').getByRole('row').nth(1)).toHaveText(
    'Un castor affairé134€NIRINA',
  )
  await expect(page.getByTitle('Remboursements').getByRole('row').nth(2)).toHaveText(
    'Un castor affairé42€Un ornithorynque malicieux',
  )
  await expect(
    page.getByText(
      'NIRINA a dépensé 310€ pour Un castor affairé, NIRINA, Un ornithorynque malicieux',
    ),
  ).toBeVisible()

  await expect(
    page.getByText(
      'Un ornithorynque malicieux a dépensé 218€ pour Un castor affairé, NIRINA, Un ornithorynque malicieux',
    ),
  ).toBeVisible()
})

test('test utilisateur', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('tab', { name: 'Mode détaillé', disabled: false }).click()
  await page.waitForURL('/detaille')
  await page.getByRole('button', { name: 'Ajouter une personne' }).click()
  await page.getByRole('button', { name: 'Ajouter une personne' }).click()
  await page.getByRole('button', { name: 'Ajouter une personne' }).click()
  await page.getByLabel('a dépensé').click()
  await page.getByLabel('a dépensé').fill('')
  await page.getByLabel('Un castor affairé').check()
  await page.getByLabel('Une autruche curieuse').check()
  await page.getByLabel('Un ornithorynque malicieux').check()
  await page.getByLabel('a dépensé').click()
  await page.getByLabel('a dépensé').fill('34')
  await page.getByLabel('Un castor affairé').uncheck()
  await page.locator('label').filter({ hasText: 'Un castor affairé' }).click()
  await page.getByRole('button', { name: 'Ajouter une dépense' }).click()
  await page.getByLabel('a dépensé').click()
  await page.getByLabel('a dépensé').fill('34.9')
  await page.getByRole('button', { name: 'Ajouter une dépense' }).click()

  // await expect(page.getByTitle('Remboursements').getByRole('row')).toHaveText([
  //   'quidoità qui',
  //   'Une autruche curieuse22.97€Un castor affairé',
  //   'Un ornithorynque malicieux22.97€Un castor affairé'
  // ])

  // await expect(page.getByRole('list').getByRole('listitem')).toHaveText([
  //   'Un castor affairé a dépensé 34€ pour Une autruche curieuse, Un ornithorynque malicieux, Un castor affairé',
  //   'Un castor affairé a dépensé 34.9€ pour Une autruche curieuse, Un ornithorynque malicieux, Un castor affairé'
  // ])
})
