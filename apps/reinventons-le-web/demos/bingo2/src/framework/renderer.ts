import { effect } from './reactive'
import type { VNode } from './vdom'

export function render(v: VNode | string): Node {
  if (typeof v === 'string') return document.createTextNode(v)

  const el = document.createElement(v.tag)
  for (const [k, val] of Object.entries(v.props)) {
    if (k.startsWith('on') && typeof val === 'function') {
      const event = k.slice(2).toLowerCase()
      el.addEventListener(event, val)
    } else {
      el.setAttribute(k, String(val))
    }
  }

  for (const child of v.children) el.appendChild(render(child))

  return el
}

export function mount(vnode: VNode, container: HTMLElement) {
  container.appendChild(render(vnode))
}

export function mountReactive(vnodeFn: () => VNode, container: HTMLElement) {
  effect(() => {
    container.innerHTML = ''
    const vnode = vnodeFn()
    container.appendChild(render(vnode))
  })
}
