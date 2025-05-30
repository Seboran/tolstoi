import type { Component } from '../bingo2'
import { reactive } from '../framework/reactive'
import { h } from '../framework/vdom'

export const BingoCase: Component<{ value: number }> = ({ value }) => {
  // Each cell has its own reactive state
  const cellState = reactive({
    isClicked: false,
  })

  function handleClick() {
    cellState.isClicked = !cellState.isClicked
  }

  return (
    <td class={() => (cellState.isClicked ? 'marked' : undefined)} onclick={handleClick}>
      {String(value)}
    </td>
  )
}
