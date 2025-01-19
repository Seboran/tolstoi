import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import EndScreen from '../EndScreen.vue'

describe('EndScreen.vue', () => {
  it('emits "replay" event when the button is clicked', async () => {
    const wrapper = mount(EndScreen)
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('replay')
  })
})
