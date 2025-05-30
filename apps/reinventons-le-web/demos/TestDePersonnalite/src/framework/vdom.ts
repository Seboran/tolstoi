export type VNode = {
  tag: string | Function
  props: Record<string, any>
  children: Array<VNode | string | (() => string)>
}

export function h(
  tag: string,
  props: Record<string, any> = {},
  ...children: Array<VNode | string | (() => string)>
): VNode {
  return { tag, props, children }
}

// JSX runtime functions
export function jsx(tag: string | Function, props: Record<string, any> = {}): VNode {
  const { children, ...restProps } = props || {}
  let childrenArray: Array<VNode | string | (() => string)> = []

  if (children !== undefined) {
    if (Array.isArray(children)) {
      // Flatten nested arrays and filter out undefined/null
      childrenArray = children.flat().filter((child) => child !== undefined && child !== null)
    } else {
      childrenArray = [children]
    }
  }

  return { tag, props: restProps || {}, children: childrenArray }
}

export function jsxs(tag: string | Function, props: Record<string, any> = {}): VNode {
  return jsx(tag, props)
}

// Export jsx as default for React JSX transform
export { jsx as jsxDEV }
