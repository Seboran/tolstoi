import { h } from 'nirina.js'
import type { Component } from '../declarations'

// This component uses the old h function syntax
export const StatusMessage: Component<{ message: string }> = ({ message }) =>
  h('p', { class: 'status-message', style: 'color: blue; font-style: italic;' }, message)
