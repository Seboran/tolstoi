import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import GenerateButton from '../GenerateButton.vue'

describe('GenerateButton', () => {
  it('renders the generate button', () => {
    const wrapper = mount(GenerateButton)
    expect(wrapper.find('#buttonGenerate').text()).toBe('GENERATE')
  })

  it('emits submit event when button is clicked', async () => {
    const wrapper = mount(GenerateButton)
    await wrapper.find('#buttonGenerate').trigger('click')
    expect(wrapper.emitted('submit')).toHaveLength(1)
  })

  // Deliberately NOT testing:
  // - update() function
  // - isHex() function with invalid keys
  // This gives us partial coverage (~50%)
})
