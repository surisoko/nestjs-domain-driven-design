import { InvalidArgumentException } from '../exception/invalid-argument.exception'

type Primitives = string | number | boolean | Date

export abstract class ValueObject<T extends Primitives> {
  readonly value: T

  public constructor(value: T) {
    this.isDefined(value)
    this.value = value
  }

  private isDefined(value: T): void {
    if (value === null || value === undefined) {
      throw InvalidArgumentException.mustBeDefined()
    }
  }

  equals(other: ValueObject<T>): boolean {
    return (
      other.constructor.name === this.constructor.name &&
      other.value === this.value
    )
  }
}
