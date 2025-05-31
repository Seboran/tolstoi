import type { Component } from '../bingo2'
import { h } from '../framework/vdom'

export const Button: Component<{
  onClick: () => void
  children: any
}> = ({ onClick, children }) => <button onclick={onClick}>{children}</button>
