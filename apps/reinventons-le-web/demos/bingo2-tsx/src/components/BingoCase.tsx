import type { Component } from '../bingo2'
import { h } from '../framework/vdom'

export const BingoCase: Component<{ value: number; highlight: boolean }> = ({
  value,
  highlight,
}) => <td class={`bingo-case${highlight ? ' highlighted' : ''}`}>{String(value)}</td>
