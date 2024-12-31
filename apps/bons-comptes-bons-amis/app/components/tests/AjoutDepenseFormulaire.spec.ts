import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/vue'
import { describe, expect, test } from 'vitest'
import AjoutDepenseFormulaire from '~/components/AjoutDepenseFormulaire.vue'

describe('Ajout de dépenses', () => {
  test('Ajouter une dépense pour 2 personnes', async () => {
    const { getByRole, emitted } = render(AjoutDepenseFormulaire, {
      props: {
        nomsBalances: ['un castor affairé', 'une autruche curieuse', 'un ornithorynque malicieux'],
        indexDepenseur: 0,
        montant: 0,
        beneficiaire: [],
      },
    })
    await userEvent.selectOptions(getByRole('combobox'), ['une autruche curieuse'])

    await userEvent.type(getByRole('spinbutton', { name: 'a dépensé' }), '230')

    await userEvent.click(getByRole('checkbox', { name: 'un castor affairé' }))
    await userEvent.click(getByRole('checkbox', { name: 'un ornithorynque malicieux' }))

    await userEvent.click(getByRole('button', { name: 'Ajouter une dépense' }))

    expect(emitted('ajouterDepense')).toEqual([['1', 230, [0, 2]]])
  })
})
