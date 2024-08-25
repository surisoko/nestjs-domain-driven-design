import { Inject } from '@nestjs/common'
import {
  EventBus,
  eventBusDefinition,
} from 'src/shared/domain/service/event-bus.service'
import { Product } from 'src/products/domain/entity/product.entity'
import {
  ProductRepository,
  productRepositoryDefinition,
} from 'src/products/domain/repository/product.repository'
import { ProductName } from 'src/products/domain/value-object/product-name.value-object'
import { ProductPrice } from 'src/products/domain/value-object/product-price.value-object'
import { ProductInStock } from 'src/products/domain/value-object/product-in-stock.value-object'

export class CreateProduct {
  constructor(
    @Inject(productRepositoryDefinition.name)
    private readonly productRepository: ProductRepository,
    @Inject(eventBusDefinition.name) private readonly eventBus: EventBus,
  ) {}

  public async execute(
    name: ProductName,
    price: ProductPrice,
    inStock: ProductInStock,
  ): Promise<void> {
    const product = Product.create({
      name,
      price,
      inStock,
    })

    await this.productRepository.create(product)
    this.eventBus.publish(product.pullEvents())
  }
}
