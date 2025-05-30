import type { Component } from '../declarations'
import { h } from '../framework/vdom'

export const AppContainer: Component<{ children: any }> = ({ children }) => (
  <div class="app-container">{children}</div>
)
