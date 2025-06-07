import type { Component } from '../bingo2'
import { h } from '../framework/vdom'

export const BingoCase: Component<{ value: number }> = ({ value }) => {
  function handleClick() {
    // TODO
  }

  return (
    // 'marked' + bien penser à faire une fonction
    <td onclick={handleClick}>{String(value)}</td>
  )
}
