import type { Component } from '../bingo2'
import { h } from '../framework/vdom'
import { BingoCase } from './BingoCase'

export const BingoRow: Component<{ values: number[] }> = ({ values }) => (
  <tr>
    {values.map((v) => (
      <BingoCase value={v} />
    ))}
  </tr>
)
