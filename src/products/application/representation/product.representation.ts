import { Product } from 'src/products/domain/entity/product.entity'

export class ProductRepresentation {
  private constructor(private readonly product: Product) {}

  public static fromProduct(product: Product): ProductRepresentation {
    return new this(product)
  }

  public format(): ProductRepresentationPrimitives {
    const product = this.product.toPrimitives()

    return {
      id: product.id,
      name: product.name,
      price: product.price,
      inStock: product.inStock,
      createdAt: product.createdAt.toISOString(),
    }
  }
}

export type ProductRepresentationPrimitives = {
  id: string
  name: string
  price: number
  inStock: boolean
  createdAt: string
}
