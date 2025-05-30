import type { Component } from '../bingo2'
import { h } from '../framework/vdom'

export const AppContainer: Component<{ children: any[] }> = ({ children }) =>
  h('div', { class: 'app-container' }, ...children)
