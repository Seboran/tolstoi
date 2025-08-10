import { h } from 'nirina.js'
import type { Component } from '../declarations'

export const AppContainer: Component<{ children: any }> = ({ children }) => (
  <div class="app-container">{children}</div>
)
