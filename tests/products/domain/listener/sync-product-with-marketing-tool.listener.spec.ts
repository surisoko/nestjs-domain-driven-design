import { faker } from '@faker-js/faker'
import { prisma } from 'src/app.module'
import { Product } from 'src/products/domain/entity/product.entity'
import { ProductCreated } from 'src/products/domain/event/product-created.event'
import { SyncProductWithMarketingTool } from 'src/products/domain/listener/sync-product-with-marketing-tool.listener'
import { ProductInStock } from 'src/products/domain/value-object/product-in-stock.value-object'
import { ProductName } from 'src/products/domain/value-object/product-name.value-object'
import { ProductPrice } from 'src/products/domain/value-object/product-price.value-object'
import { PrismaProductRepository } from 'src/products/infrastructure/repository/product.repository'
import { FakeMarketingToolService } from 'tests/shared/infrastructure/service/fake-marketing-tool.service'

describe('Sync product with marketing tool', () => {
  beforeEach(async () => {
    const products = prisma.product.deleteMany()
    await prisma.$transaction([products])
  })

  afterAll(async () => {
    const products = prisma.product.deleteMany()
    await prisma.$transaction([products])
    await prisma.$disconnect()
  })

  it('sync product with marketing tool', async () => {
    const product = Product.create({
      name: ProductName.fromString(faker.string.alpha({ length: { min:3, max: 30 } })),
      price: ProductPrice.fromNumber(5),
      inStock: ProductInStock.fromBoolean(true),
    })
    await prisma.product.create({
      data: product.toPrimitives(),
    })
    const fakeMarketingToolService = new FakeMarketingToolService()
    const productCreatedEvent = new ProductCreated(product)
    const syncProductWithMarketingTool = new SyncProductWithMarketingTool(
      new PrismaProductRepository(),
      fakeMarketingToolService,
    )

    await syncProductWithMarketingTool.execute(productCreatedEvent)

    expect(fakeMarketingToolService.wasCalled).toBeTruthy()
  })
})
