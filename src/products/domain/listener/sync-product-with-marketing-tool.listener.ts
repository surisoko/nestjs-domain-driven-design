import { Inject } from '@nestjs/common'
import {
  MarketingToolService,
  marketingToolServiceDefinition,
} from 'src/shared/domain/service/marketing-tool.service'
import { ProductCreated } from '../event/product-created.event'
import {
  ProductRepository,
  productRepositoryDefinition,
} from '../repository/product.repository'

export class SyncProductWithMarketingTool {
  public constructor(
    @Inject(productRepositoryDefinition.name)
    private readonly productRepository: ProductRepository,
    @Inject(marketingToolServiceDefinition.name)
    private readonly marketingToolService: MarketingToolService,
  ) {}

  public async execute(productCreated: ProductCreated): Promise<void> {
    const product = await this.productRepository.findById(
      productCreated.product.id,
    )

    await this.marketingToolService.syncProduct(product)
  }
}
