import type { VNode } from 'nirina.js'

export interface Component<P = {}> {
  (props: P): VNode
}
