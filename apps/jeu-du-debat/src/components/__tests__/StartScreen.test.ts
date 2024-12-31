import { describe, expect, test } from 'vitest'
import StartScreen from '../StartScreen.vue'
import { mount } from '@vue/test-utils'

describe('StartScreen', () => {
  test('emits start event with default value', async () => {
    const DEFAULT_VALUE = 3
    const wrapper = mount(StartScreen)
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('start')
    expect(wrapper.emitted('start')?.[0]).toContain(DEFAULT_VALUE)
  })
  test('emits start event with new value', async () => {
    const NEW_VALUE = 5
    const wrapper = mount(StartScreen)
    const inputWrapper = wrapper.find('input')
    const buttonWrapper = wrapper.find('button')
    await inputWrapper.setValue(5)
    await buttonWrapper.trigger('click')
    expect(wrapper.emitted('start')?.[0]).toContain(NEW_VALUE)
  })
})
