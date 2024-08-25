import { Product as PrismaProduct } from '@prisma/client'
import { Product } from 'src/products/domain/entity/product.entity'

export class ProductsToDomainParser {
  public static execute(products: PrismaProduct[]): Product[] {
    return products.map((product) => {
      return Product.fromPrimitives({
        id: product.id,
        name: product.name,
        price: product.price.toNumber(),
        inStock: product.inStock,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      })
    })
  }
}
