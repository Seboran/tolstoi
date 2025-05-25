import type { Component } from '../bingo2'
import { h } from '../framework/vdom'
import { BingoCase } from './BingoCase'

export const BingoRow: Component<{ values: number[]; highlighted: Set<number> }> = ({
  values,
  highlighted,
}) => h('tr', {}, ...values.map((v) => BingoCase({ value: v, highlight: highlighted.has(v) })))
