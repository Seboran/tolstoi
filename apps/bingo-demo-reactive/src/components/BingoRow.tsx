import { h } from 'nirina.js'
import type { Component } from '../bingo2'
import { BingoCase } from './BingoCase'

export const BingoRow: Component<{ values: number[] }> = ({ values }) => (
  <tr>
    {values.map((v) => (
      <BingoCase value={v} />
    ))}
  </tr>
)
