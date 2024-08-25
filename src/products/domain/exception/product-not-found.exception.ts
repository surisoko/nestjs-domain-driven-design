import { ProductId } from '../value-object/product-id.value-object'

export class ProductNotFoundException extends Error {
  public static execute(id: ProductId): ProductNotFoundException {
    return new this(`Product with id ${id.value} not found`)
  }
}
