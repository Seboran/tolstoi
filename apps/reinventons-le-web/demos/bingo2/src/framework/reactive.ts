type Effect = () => void
let activeEffect: Effect | null = null
const depsMap = new WeakMap<object, Map<string, Set<Effect>>>()

export function reactive<T extends object>(obj: T): T {
  return new Proxy(obj, {
    get(target, key: string) {
      if (activeEffect) {
        const deps = depsMap.get(target) || new Map()
        const dep = deps.get(key) || new Set()
        dep.add(activeEffect)
        deps.set(key, dep)
        depsMap.set(target, deps)
      }
      return Reflect.get(target, key)
    },
    set(target, key: string, val) {
      const result = Reflect.set(target, key, val)
      const deps = depsMap.get(target)?.get(key)
      deps?.forEach((fn) => fn())
      return result
    },
  })
}

export function effect(fn: Effect) {
  activeEffect = fn
  fn()
  activeEffect = null
}

export function ref<T>(value: T) {
  return reactive({ value })
}

// Special reactive Set that triggers effects on mutations
export function reactiveSet<T>(): Set<T> & { trigger: () => void } {
  const set = new Set<T>()
  const deps = new Set<Effect>()

  const trigger = () => {
    deps.forEach((fn) => fn())
  }

  return new Proxy(set as any, {
    get(target, key) {
      if (key === 'trigger') return trigger

      // Track reads for reactivity
      if (activeEffect && (key === 'has' || key === 'size' || key === Symbol.iterator)) {
        deps.add(activeEffect)
      }

      // Handle methods that mutate the set
      if (key === 'add' || key === 'delete' || key === 'clear') {
        return function (...args: any[]) {
          const result = (target as any)[key].apply(target, args)
          trigger()
          return result
        }
      }

      // Handle methods that need proper binding
      if (key === 'has') {
        return function (...args: any[]) {
          return (target as any)[key].apply(target, args)
        }
      }

      // Default case
      const value = Reflect.get(target, key)
      return typeof value === 'function' ? value.bind(target) : value
    },
  })
}
