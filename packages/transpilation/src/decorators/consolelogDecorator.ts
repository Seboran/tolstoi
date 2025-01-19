export function consolelogDecorator(
  _target: unknown,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  const originalMethod = descriptor.value

  descriptor.value = function (...args: unknown[]) {
    console.log(`Avant l'exécution de la fonction : ${propertyKey}`)
    const result = originalMethod.apply(this, args)
    console.log(`Après l'exécution de la fonction : ${propertyKey}`)
    return result
  }

  return descriptor
}
