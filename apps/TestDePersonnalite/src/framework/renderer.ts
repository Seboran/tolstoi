import { effect } from './reactive'
import type { VNode } from './vdom'

export function render(
  v: VNode | string | Array<VNode | string | (() => string)> | (() => string),
): Node {
  console.log('Rendering:', v)

  if (typeof v === 'string') return document.createTextNode(v)

  // Handle reactive functions
  if (typeof v === 'function') {
    const textNode = document.createTextNode('')
    effect(() => {
      textNode.textContent = String(v())
    })
    return textNode
  }

  // Handle arrays by creating a document fragment
  if (Array.isArray(v)) {
    console.log('Rendering array of children')
    const fragment = document.createDocumentFragment()
    for (const child of v) {
      if (child !== undefined && child !== null) {
        fragment.appendChild(render(child))
      }
    }
    return fragment
  }

  // If tag is a function (component), call it with props
  if (typeof v.tag === 'function') {
    console.log('Calling component function:', v.tag.name)
    const componentVNode = v.tag({ ...v.props, children: v.children || [] })
    return render(componentVNode)
  }

  console.log('Creating element:', v.tag)
  const el = document.createElement(v.tag as string)
  const props = v.props || {}
  for (const [k, val] of Object.entries(props)) {
    if (k.startsWith('on') && typeof val === 'function') {
      const event = k.slice(2).toLowerCase()
      el.addEventListener(event, val)
    } else if (typeof val === 'function') {
      // Handle reactive attributes
      effect(() => {
        el.setAttribute(k, String(val()))
      })
    } else {
      el.setAttribute(k, String(val))
    }
  }

  const children = v.children || []
  console.log('Processing children:', children)
  for (const child of children) {
    if (child !== undefined && child !== null) {
      // Check if child is a reactive function
      if (typeof child === 'function') {
        // Create a text node that updates reactively
        const textNode = document.createTextNode('')
        effect(() => {
          textNode.textContent = String(child())
        })
        el.appendChild(textNode)
      } else {
        el.appendChild(render(child))
      }
    }
  }

  return el
}

export function mount(vnode: VNode, container: HTMLElement) {
  container.innerHTML = ''
  container.appendChild(render(vnode))
}

export function mountReactive(vnodeFn: () => VNode, container: HTMLElement) {
  effect(() => {
    container.innerHTML = ''
    const vnode = vnodeFn()
    container.appendChild(render(vnode))
  })
}
