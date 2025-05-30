import type { Component } from '../bingo2'
import { h } from '../framework/vdom'

export const BingoCase: Component<{ value: number; nombresCoches: number[] }> = ({
  value,
  nombresCoches,
}) => {
  return (
    <td
      class={nombresCoches.includes(value) ? 'marked' : undefined}
      onclick={() => nombresCoches.push(value)}
    >
      {String(value)}
    </td>
  )
}
