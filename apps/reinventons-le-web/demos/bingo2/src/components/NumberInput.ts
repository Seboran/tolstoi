import type { Component } from '../bingo2'
import { h } from '../framework/vdom'

export const NumberInput: Component<{
  value: string
  placeholder?: string
  onInput: (value: string) => void
}> = ({ value, placeholder = '', onInput }) =>
  h('input', {
    type: 'number',
    value,
    placeholder,
    oninput: (e: Event) => {
      const target = e.target as HTMLInputElement
      onInput(target.value)
    },
  })
