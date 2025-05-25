import type { Component } from '../bingo2'
import { h } from '../framework/vdom'
import { BingoRow } from './BingoRow'

export const BingoTableau: Component<{ rows: number[][]; highlighted: Set<number> }> = ({
  rows,
  highlighted,
}) => (
  <table class="bingo-tableau">
    {rows.map((r) => (
      <BingoRow values={r} highlighted={highlighted} />
    ))}
  </table>
)
