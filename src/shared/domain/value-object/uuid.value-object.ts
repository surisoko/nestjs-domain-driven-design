import { UUIDException } from '../exception/uuid.exceptions'
import { ValueObject } from './value-object'
import { randomUUID } from 'crypto'

export class Uuid extends ValueObject<string> {
  private uuidV4Regex =
    /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i

  public constructor(value: string) {
    super(value)
    this.isValid(value)
  }

  public static create(): Uuid {
    return new this(randomUUID().toString())
  }

  public static fromString(value: string): Uuid {
    return new this(value)
  }

  private isValid(value: string): void {
    if (!new RegExp(this.uuidV4Regex).test(value)) {
      throw UUIDException.invalid()
    }
  }
}
