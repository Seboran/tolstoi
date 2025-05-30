import type { Component } from '../declarations'
import { h } from '../framework/vdom'

export const Button: Component<{
  onClick: () => void
  children: any
}> = ({ onClick, children }) => <button onclick={onClick}>{children}</button>
