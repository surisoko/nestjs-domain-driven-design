import { InvalidArgumentException } from '../exception/invalid-argument.exception'
import { ValueObject } from './value-object'

export abstract class NumberValueObject extends ValueObject<number> {
  constructor(value: number) {
    super(value)
    this.isNumber(value)
  }

  private isNumber(value: number): void {
    if (typeof value !== 'number') {
      throw InvalidArgumentException.mustBeNumber(value)
    }
  }
}
