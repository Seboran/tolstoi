/**
 * Virtual DOM + JSX runtime for nirina.js
 *
 * Exports:
 *  - VNode: Core virtual node type
 *  - h(): Manual hyperscript creator for classic JSX factory mode
 *  - jsx/jsxs/jsxDEV: Automatic JSX runtime entrypoints
 *  - Fragment: Placeholder component enabling <>...</> syntax (optional)
 *
 * Keep this module minimal; additions should remain backwards compatible.
 */

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

// Fragment support (optional usage). Enables <>children</> with proper tsconfig.
// Exported to align with React-like automatic runtime expectations.
export const Fragment = (props: { children?: any }) => props.children

// Export jsx as default for React JSX transform
export { jsx as jsxDEV }
