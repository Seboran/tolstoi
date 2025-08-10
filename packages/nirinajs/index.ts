/**
 * Public entrypoint for nirina.js
 *
 * NOTE: This file lives at the package root. If you want declaration files
 * (index.d.ts) to be generated for it, ensure your tsconfig "include"
 * pattern also covers this file (currently only "src" is included).
 *
 * Re-exports:
 *  - Reactive system: reactive, effect, ref, reactiveSet
 *  - VDOM / JSX helpers: h, jsx, jsxs, jsxDEV, VNode type
 *  - Renderer: render, mount, mountReactive
 */

// Reactive system
export { reactive, effect, ref, reactiveSet } from './src/framework/reactive'

// VDOM / JSX runtime
export { h } from './src/framework/vdom'
export { jsx, jsxs, jsxDEV } from './src/framework/vdom'
export type { VNode } from './src/framework/vdom'

// Renderer
export { render, mount, mountReactive } from './src/framework/renderer'

// Optional aggregated default export for convenience / discoverability
import { effect, reactive, reactiveSet, ref } from './src/framework/reactive'
import { mount, mountReactive, render } from './src/framework/renderer'
import { h, jsx, jsxDEV, jsxs } from './src/framework/vdom'

const Nirina = {
  // reactive core
  reactive,
  effect,
  ref,
  reactiveSet,
  // vdom / jsx
  h,
  jsx,
  jsxs,
  jsxDEV,
  // renderer
  render,
  mount,
  mountReactive,
}

export default Nirina
