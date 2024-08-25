import { Product } from 'src/products/domain/entity/product.entity'

export interface MarketingToolService {
  syncProduct(product: Product): Promise<void>
}

export const marketingToolServiceDefinition = {
  name: 'MarketingToolService',
}
