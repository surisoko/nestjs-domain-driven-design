import { InvalidArgumentException } from '../exception/invalid-argument.exception'
import { ValueObject } from './value-object'

export abstract class StringValueObject extends ValueObject<string> {
  constructor(value: string) {
    super(value)
    this.isString(value)
  }

  private isString(value: string): void {
    if (typeof value !== 'string') {
      throw InvalidArgumentException.mustBeString(value)
    }
  }
}
