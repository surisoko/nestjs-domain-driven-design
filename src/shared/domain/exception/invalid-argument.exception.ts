export class InvalidArgumentException extends Error {
  public static mustBeDefined(): InvalidArgumentException {
    return new this('Value must be defined')
  }

  public static mustBeString(value: string): InvalidArgumentException {
    return new this(`Invalid string value ${value}`)
  }

  public static mustBeBoolean(value: boolean): InvalidArgumentException {
    return new this(`Invalid boolean value ${value}`)
  }

  public static mustBeNumber(value: number): InvalidArgumentException {
    return new this(`Invalid number value ${value}`)
  }
}
