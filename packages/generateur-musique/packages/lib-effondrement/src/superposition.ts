import { Regle } from './models/regle'

export class Superposition<ValeursSuperposition, ResultatContextualisation> {
  constructor(
    public solutions: ValeursSuperposition[] = [],
    public contextualisation: () => ResultatContextualisation,
  ) {
    Object.defineProperty(this, 'contextualisation', {
      value: contextualisation,
      enumerable: false, // makes it non-enumerable
      writable: true, // makes it writable if needed
    })
  }

  appliquer(
    regles: Regle<ValeursSuperposition, ResultatContextualisation>[],
  ): Superposition<ValeursSuperposition, ResultatContextualisation> {
    return new Superposition(
      regles.reduce(
        (accumulator, regle) =>
          regle.visit(new Superposition(accumulator, this.contextualisation)),
        this.solutions,
      ),
      this.contextualisation,
    )
  }
}
