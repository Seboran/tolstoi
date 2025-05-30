import type { Component } from '../bingo2'
import { h } from '../framework/vdom'

export const BingoCase: Component<{ value: number }> = ({ value }) => <td>{String(value)}</td>
