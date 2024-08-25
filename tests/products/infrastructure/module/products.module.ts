import { Module } from '@nestjs/common'
import { GetProductById } from '../../../../src/products/application/use-case/get-product.use-case'
import { productRepositoryDefinition } from '../../../../src/products/domain/repository/product.repository'
import { GetProductController } from '../../../../src/products/infrastructure/controller/get-product.controller'
import { FakeProductRepository } from 'tests/products/infrastructure/repository/fake-product.repository'

@Module({
  imports: [],
  controllers: [GetProductController],
  providers: [
    GetProductById,
    {
      provide: productRepositoryDefinition.name,
      useClass: FakeProductRepository,
    },
  ],
})
export class ProductsModule {}
