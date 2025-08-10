import { h } from 'nirina.js'
import type { Component } from '../bingo2'

export const NumberInput: Component<{
  value: string
  placeholder?: string
  onInput: (value: string) => void
}> = ({ value, placeholder = '', onInput }) => (
  <input
    type="number"
    value={value}
    placeholder={placeholder}
    oninput={(e: Event) => {
      const target = e.target as HTMLInputElement
      onInput(target.value)
    }}
  />
)
