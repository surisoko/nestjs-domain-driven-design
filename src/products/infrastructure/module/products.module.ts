import { Module } from '@nestjs/common'
import { GetProductController } from '../controller/get-product.controller'
import { GetProductById } from '../../application/use-case/get-product.use-case'
import { productRepositoryDefinition } from '../../domain/repository/product.repository'
import { PrismaProductRepository } from '../repository/product.repository'
import { CreateProduct } from 'src/products/application/use-case/create-product.use-case'
import { CreateProductController } from '../controller/create-product.controller'
import { SyncProductWithMarketingToolSubscriber } from 'src/products/infrastructure/subscriber/sync-product-with-marketing-tool.subscriber'
import { SyncProductWithMarketingTool } from 'src/products/domain/listener/sync-product-with-marketing-tool.listener'
import { GetProductsController } from '../controller/get-products.controller'
import { GetProducts } from 'src/products/application/use-case/get-products.use-case'

@Module({
  imports: [],
  controllers: [
    GetProductController,
    CreateProductController,
    GetProductsController,
  ],
  providers: [
    GetProductById,
    GetProducts,
    CreateProduct,
    SyncProductWithMarketingTool,
    SyncProductWithMarketingToolSubscriber,
    PrismaProductRepository,
    {
      provide: productRepositoryDefinition.name,
      useClass: PrismaProductRepository,
    },
  ],
  exports: [GetProductById],
})
export class ProductsModule {}
