import { Product } from 'src/products/domain/entity/product.entity'
import { MarketingToolService } from 'src/shared/domain/service/marketing-tool.service'

export class FakeMarketingToolService implements MarketingToolService {
  public wasCalled = false

  public async syncProduct(product: Product): Promise<void> {
    this.wasCalled = true
  }
}
