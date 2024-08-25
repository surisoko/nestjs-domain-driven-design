import { Injectable } from '@nestjs/common'
import { rejects } from 'assert'
import { Product } from 'src/products/domain/entity/product.entity'
import { MarketingToolService } from 'src/shared/domain/service/marketing-tool.service'

@Injectable()
export class MailtrapMarketingToolService implements MarketingToolService {
  public async syncProduct(product: Product): Promise<void> {
    // mailtrap real implementation
    await new Promise((resolve) => {
      return resolve
    })
  }
}
