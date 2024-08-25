import { Product } from 'src/products/domain/entity/product.entity'
import {
  ProductRepresentation,
  ProductRepresentationPrimitives,
} from './product.representation'

export class ProductsRepresentation {
  private constructor(private readonly products: Product[]) {}

  public static fromProducts(products: Product[]): ProductsRepresentation {
    return new this(products)
  }

  public format(): ProductRepresentationPrimitives[] {
    return this.products.map((product) => {
      return ProductRepresentation.fromProduct(product).format()
    })
  }
}
