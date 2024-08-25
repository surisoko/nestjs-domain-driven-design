import { Product } from '../entity/product.entity'
import { ProductId } from '../value-object/product-id.value-object'

export interface ProductRepository {
  create(product: Product): Promise<void>
  findById(id: ProductId): Promise<Product>
  findAll(): Promise<Product[]>
}

export const productRepositoryDefinition = {
  name: 'ProductRepository',
}
