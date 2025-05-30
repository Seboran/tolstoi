import type { Component } from '../declarations'
import { h } from '../framework/vdom'
import { BingoRow } from './BingoRow'

export const BingoTableau: Component<{ rows: number[][]; nombresCoches: number[] }> = ({
  rows,
  nombresCoches,
}) => (
  <table class="bingo-tableau">
    {rows.map((r) => (
      <BingoRow values={r} nombresCoches={nombresCoches} />
    ))}
  </table>
)
