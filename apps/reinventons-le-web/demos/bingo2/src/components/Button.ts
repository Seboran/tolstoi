import type { Component } from '../bingo2'
import { h } from '../framework/vdom'

export const Button: Component<{
  onClick: () => void
  children: string
}> = ({ onClick, children }) => h('button', { onclick: onClick }, children)
