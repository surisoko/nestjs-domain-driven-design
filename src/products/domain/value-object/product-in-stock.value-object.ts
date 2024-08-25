import { BooleanValueObject } from 'src/shared/domain/value-object/boolean.value-object'
import { ProductInStockException } from '../exception/product-in-stock.exception'

export class ProductInStock extends BooleanValueObject {
  public constructor(private readonly inStock: boolean) {
    super(inStock)
  }

  public static fromBoolean(inStock: boolean): ProductInStock {
    if (typeof inStock !== 'boolean') {
      throw ProductInStockException.mustBeBoolean()
    }

    return new this(inStock)
  }
}
