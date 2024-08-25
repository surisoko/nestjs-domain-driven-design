import { InvalidArgumentException } from '../exception/invalid-argument.exception'
import { ValueObject } from './value-object'

export abstract class BooleanValueObject extends ValueObject<boolean> {
  constructor(value: boolean) {
    super(value)
    this.isBoolean(value)
  }

  private isBoolean(value: boolean): void {
    if (typeof value !== 'boolean') {
      throw InvalidArgumentException.mustBeBoolean(value)
    }
  }
}
