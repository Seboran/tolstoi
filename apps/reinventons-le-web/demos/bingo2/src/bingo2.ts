import type { VNode } from './framework/vdom'

export interface Component<P = {}> {
  (props: P): VNode
}
