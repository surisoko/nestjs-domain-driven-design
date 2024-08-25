import { OnEvent } from '@nestjs/event-emitter'
import { ProductCreated } from 'src/products/domain/event/product-created.event'
import { Injectable } from '@nestjs/common'
import { SyncProductWithMarketingTool } from 'src/products/domain/listener/sync-product-with-marketing-tool.listener'

@Injectable()
export class SyncProductWithMarketingToolSubscriber {
  public constructor(
    private readonly syncProductWithMarketingTool: SyncProductWithMarketingTool,
  ) {}

  @OnEvent('product.created', { async: true })
  async handleProductCreatedEvent(productCreated: ProductCreated) {
    await this.syncProductWithMarketingTool.execute(productCreated)
  }
}
