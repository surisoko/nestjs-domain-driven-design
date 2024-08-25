import { NumberValueObject } from 'src/shared/domain/value-object/number.value-object'
import { ProductPriceException } from '../exception/product-price.exception'

export class ProductPrice extends NumberValueObject {
  public static maxPrice = 500000

  public constructor(private readonly price: number) {
    super(price)
    this.isValid()
  }

  public static fromNumber(price: number): ProductPrice {
    return new this(price)
  }

  private isValid(): void {
    if (this.price > ProductPrice.maxPrice) {
      throw ProductPriceException.tooHigh()
    }
  }
}
