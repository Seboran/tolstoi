export function applyMethodDecoratorToAllMethods(decorator: Function) {
  return function (cons: Function) {
    for (const propertyName of Object.getOwnPropertyNames(cons.prototype)) {
      const descriptor = Object.getOwnPropertyDescriptor(cons.prototype, propertyName)

      // Vérifiez si la propriété est une méthode (et non le constructeur)
      if (propertyName !== 'constructor' && typeof descriptor?.value === 'function') {
        const decoratedDescriptor = decorator(cons.prototype, propertyName, descriptor)
        if (decoratedDescriptor) {
          Object.defineProperty(cons.prototype, propertyName, decoratedDescriptor)
        }
      }
    }
  }
}
