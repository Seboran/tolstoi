import type { Component } from '../bingo2'
import { h } from '../framework/vdom'

export const BingoCase: Component<{ value: number }> = ({ value }) => {
  function handleClick() {
    // TODO: Implement logic to handle click
  }

  return (
    // class={() => (cellState.isClicked ? 'marked' : undefined)}
    <td onclick={handleClick}>{String(value)}</td>
  )
}
