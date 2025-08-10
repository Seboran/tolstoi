import { h } from 'nirina.js'
import type { Component } from '../declarations'

export const Button: Component<{
  onClick: () => void
  children: any
}> = ({ onClick, children }) => <button onclick={onClick}>{children}</button>
