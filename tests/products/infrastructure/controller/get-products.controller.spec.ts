import { faker } from '@faker-js/faker'
import { HttpStatus } from '@nestjs/common'
import { prisma } from 'src/app.module'
import { Product } from 'src/products/domain/entity/product.entity'
import { ProductId } from 'src/products/domain/value-object/product-id.value-object'
import { TestApi } from 'tests/test-api'

describe('Get all products', () => {
  let testApi: TestApi

  beforeEach(async () => {
    testApi = await TestApi.init()
    const products = prisma.product.deleteMany()
    await prisma.$transaction([products])
  })

  afterAll(async () => {
    const products = prisma.product.deleteMany()
    await prisma.$transaction([products])
    await testApi.close()
    await prisma.$disconnect()
  })

  it('get all products controller', async () => {
    const timestamp = new Date('2020-01-01')
    const product = Product.fromPrimitives({
      id: ProductId.create().value,
      name: faker.string.alpha({ length: { min: 3, max: 30 } }),
      price: Number(faker.finance.amount()),
      inStock: true,
      createdAt: timestamp,
      updatedAt: timestamp,
    })
    await prisma.product.create({
      data: {
        ...product.toPrimitives(),
        deletedAt: null,
      },
    })

    await testApi
      .request()
      .get('/products')
      .expect(HttpStatus.OK)
      .expect([
        {
          id: product.id.value,
          name: product.name.value,
          price: product.price.value,
          inStock: product.inStock.value,
          createdAt: product.createdAt.toISOString(),
        },
      ])
  })
})
