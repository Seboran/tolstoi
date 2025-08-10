import { h } from 'nirina.js'
import type { Component } from '../declarations'
import { BingoCase } from './BingoCase'

export const BingoRow: Component<{ values: number[]; nombresCoches: number[] }> = ({
  values,
  nombresCoches,
}) => (
  <tr>
    {values.map((v) => (
      <BingoCase value={v} nombresCoches={nombresCoches} />
    ))}
  </tr>
)
