import { Inject } from '@nestjs/common'
import {
  ProductRepository,
  productRepositoryDefinition,
} from 'src/products/domain/repository/product.repository'
import { ProductsRepresentation } from '../representation/products.representation'
import { ProductRepresentationPrimitives } from '../representation/product.representation'

export class GetProducts {
  public constructor(
    @Inject(productRepositoryDefinition.name)
    private readonly productRepository: ProductRepository,
  ) {}

  public async execute(): Promise<ProductRepresentationPrimitives[]> {
    const products = await this.productRepository.findAll()

    return ProductsRepresentation.fromProducts(products).format()
  }
}
