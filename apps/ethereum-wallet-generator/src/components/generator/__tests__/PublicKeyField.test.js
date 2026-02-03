import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import PublicKeyField from '../PublicKeyField.vue'

// Mock CopyButton to avoid bootstrap dependency
vi.mock('../CopyButton.vue', () => ({
  default: {
    name: 'CopyButton',
    template: '<button>Copy</button>',
    props: ['value', 'text'],
  },
}))

describe('PublicKeyField', () => {
  it('renders the ethereum address label', () => {
    const wrapper = mount(PublicKeyField, {
      props: {
        value: '0x1234567890abcdef',
      },
    })

    expect(wrapper.find('label').text()).toBe('Ethereum address')
  })

  it('displays the provided value in the input', () => {
    const testAddress = '0xabcdef1234567890'
    const wrapper = mount(PublicKeyField, {
      props: {
        value: testAddress,
      },
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe(testAddress)
  })

  it('has readonly input field', () => {
    const wrapper = mount(PublicKeyField, {
      props: {
        value: '0x123',
      },
    })

    const input = wrapper.find('input')
    expect(input.attributes('readonly')).toBeDefined()
  })
})
