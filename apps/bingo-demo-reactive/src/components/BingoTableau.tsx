import { h } from 'nirina.js'
import type { Component } from '../bingo2'
import { BingoRow } from './BingoRow'

export const BingoTableau: Component<{ rows: number[][] }> = ({ rows }) => (
  <table class="bingo-tableau">
    {rows.map((r) => (
      <BingoRow values={r} />
    ))}
  </table>
)
