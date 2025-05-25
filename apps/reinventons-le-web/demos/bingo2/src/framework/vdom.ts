export type VNode = {
  tag: string
  props: Record<string, any>
  children: Array<VNode | string>
}

export function h(
  tag: string,
  props: Record<string, any> = {},
  ...children: Array<VNode | string>
): VNode {
  return { tag, props, children }
}
