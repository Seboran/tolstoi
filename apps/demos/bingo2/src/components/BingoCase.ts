import type { Component } from '../bingo2'
import { h } from '../framework/vdom'

export const BingoCase: Component<{ value: number; highlight: boolean }> = ({ value, highlight }) =>
  h('td', { class: `bingo-case${highlight ? ' highlighted' : ''}` }, String(value))
