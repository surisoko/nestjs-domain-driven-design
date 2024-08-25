import { StringValueObject } from 'src/shared/domain/value-object/string.value-object'
import { ProductNameException } from '../exception/product-name.exception'

export class ProductName extends StringValueObject {
  public constructor(private readonly name: string) {
    super(name)
    this.isValid()
  }

  public static fromString(name: string): ProductName {
    return new this(name)
  }

  private isValid(): void {
    if (this.name.length < 3) {
      throw ProductNameException.tooShort()
    }

    if (this.name.length > 30) {
      throw ProductNameException.tooLong()
    }
  }
}
