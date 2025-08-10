/**
 * Minimal reactive system powering nirina.js
 * - reactive(): Wraps plain objects in a dependency tracking proxy
 * - effect(): Registers a reactive computation
 * - ref(): Convenience wrapper for a single mutable value
 * - reactiveSet(): Reactive Set implementation (manual tracking for mutations)
 *
 * NOTE: This is intentionally tiny; if you expand features (computed, cleanup,
 * scheduler, etc.) keep API surface backwards compatible for published package.
 */
type Effect = () => void
let activeEffect: Effect | null = null

// WeakMap<objectTarget, Map<propertyKey, Set<Effect>>>
const depsMap = new WeakMap<object, Map<string, Set<Effect>>>()

/**
 * Make an object reactive by wrapping it in a Proxy that tracks
 * property access (GET) and triggers dependent effects on SET.
 */
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

/**
 * Register a reactive effect:
 * Executes immediately, tracks dependencies during execution,
 * and re-runs automatically when any tracked dependency changes.
 */
export function effect(fn: Effect) {
  activeEffect = fn
  fn()
  activeEffect = null
}

/**
 * Create a reactive wrapper around a single value.
 * Access / mutate via .value like Vue's ref.
 */
export function ref<T>(value: T) {
  return reactive({ value })
}

/**
 * Reactive Set implementation.
 * Tracks:
 *  - Reads: size, has(), iteration
 * Triggers:
 *  - Mutations: add, delete, clear
 * Provides an explicit trigger() method (mainly for edge/manual cases).
 */
export function reactiveSet<T>(): Set<T> & { trigger: () => void } {
  const set = new Set<T>()
  const deps = new Set<Effect>()

  const trigger = () => {
    deps.forEach((fn) => fn())
  }

  return new Proxy(set as any, {
    get(target, key) {
      if (key === 'trigger') return trigger

      // Track reads for reactivity (size/has/iteration)
      if (activeEffect && (key === 'has' || key === 'size' || key === Symbol.iterator)) {
        deps.add(activeEffect)
      }

      // Mutating methods
      if (key === 'add' || key === 'delete' || key === 'clear') {
        return function (...args: any[]) {
          const result = (target as any)[key].apply(target, args)
          // Only trigger if mutation actually changed something (basic heuristic)
          if (key === 'clear' || key === 'add' || result) {
            trigger()
          }
          return result
        }
      }

      // Bind methods needing target context
      if (key === 'has') {
        return function (...args: any[]) {
          return (target as any)[key].apply(target, args)
        }
      }

      // Default
      const value = Reflect.get(target, key)
      return typeof value === 'function' ? value.bind(target) : value
    },
  })
}
