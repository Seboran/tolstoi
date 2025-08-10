import { h } from 'nirina.js'
import type { Component } from '../declarations'

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
