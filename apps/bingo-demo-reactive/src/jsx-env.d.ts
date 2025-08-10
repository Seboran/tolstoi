/**
 * JSX runtime type redirection to nirina.js
 *
 * Add (or adjust) in your tsconfig.json for automatic JSX runtime:
 * {
 *   "compilerOptions": {
 *     "jsx": "react-jsx",
 *     "jsxImportSource": "nirina.js"
 *   }
 * }
 *
 * This file declares the shape of the `nirina.js` JSX runtime so the TypeScript
 * compiler can type-check JSX when using the automatic runtime transform.
 */

import type { VNode } from 'nirina.js'

/**
 * Module declarations mirroring the React-style automatic runtime entrypoints.
 * TypeScript will look these up based on `jsxImportSource`.
 */
declare module 'nirina.js/jsx-runtime' {
  import type { VNode } from 'nirina.js'
  // The automatic runtime calls these factories.
  export function jsx(type: any, props: any, key?: any): VNode
  export function jsxs(type: any, props: any, key?: any): VNode
  // Development variant (you can refine the signature later if you track debug info)
  export { jsx as jsxDEV }
}

declare module 'nirina.js/jsx-dev-runtime' {
  import type { VNode } from 'nirina.js'
  export function jsx(type: any, props: any, key?: any): VNode
  export function jsxs(type: any, props: any, key?: any): VNode
  export { jsx as jsxDEV }
}

/**
 * Global JSX namespace so .tsx files know what a JSX element is.
 * If another file already declares this, ensure the definitions stay compatible.
 */
declare global {
  // biome-ignore lint/style/noNamespace: <explanation>
  namespace JSX {
    // What <Element /> resolves to
    interface Element extends VNode {}
    // Allow any intrinsic tag name (you can tighten this later)
    interface IntrinsicElements {
      [elemName: string]: any
    }
    // Children prop key
    interface ElementChildrenAttribute {
      children: {}
    }
  }
}
