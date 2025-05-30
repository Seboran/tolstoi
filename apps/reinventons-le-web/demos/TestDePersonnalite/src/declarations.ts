import type { VNode } from './framework/vdom'

export interface Component<P = {}> {
  (props: P): VNode
}

// JSX namespace declaration
declare global {
  // biome-ignore lint/style/noNamespace: <explanation>
  namespace JSX {
    interface Element extends VNode {}
    interface IntrinsicElements {
      [elemName: string]: any
    }
    interface ElementChildrenAttribute {
      children: {}
    }
  }
}
