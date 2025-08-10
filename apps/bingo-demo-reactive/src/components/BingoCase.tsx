import { h } from 'nirina.js'
import type { Component } from '../bingo2'

export const BingoCase: Component<{ value: number }> = ({ value }) => {
  function handleClick() {
    // TODO
  }

  return (
    // 'marked' + bien penser à faire une fonction
    <td onclick={handleClick}>{String(value)}</td>
  )
}
