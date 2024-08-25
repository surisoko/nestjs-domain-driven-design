import { Inject, Injectable } from '@nestjs/common'
import {
  ProductRepository,
  productRepositoryDefinition,
} from '../../domain/repository/product.repository'
import { ProductId } from 'src/products/domain/value-object/product-id.value-object'
import {
  ProductRepresentation,
  ProductRepresentationPrimitives,
} from '../representation/product.representation'

@Injectable()
export class GetProductById {
  constructor(
    @Inject(productRepositoryDefinition.name)
    public productRepository: ProductRepository,
  ) {}

  public async execute(
    id: ProductId,
  ): Promise<ProductRepresentationPrimitives> {
    const product = await this.productRepository.findById(id)

    return ProductRepresentation.fromProduct(product).format()
  }
}
