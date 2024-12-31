import { mount } from '@vue/test-utils'
import EndScreen from '../EndScreen.vue'
import { describe, expect, it } from 'vitest'

describe('EndScreen.vue', () => {
  it('emits "replay" event when the button is clicked', async () => {
    const wrapper = mount(EndScreen)
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('replay')
  })
})
