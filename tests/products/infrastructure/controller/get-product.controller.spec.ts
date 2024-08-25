import { TestingModuleBuilder } from '@nestjs/testing'
import { HttpStatus } from '@nestjs/common'
import { faker } from '@faker-js/faker'
import { FakeProductRepository } from '../repository/fake-product.repository'
import { productRepositoryDefinition } from '../../../../src/products/domain/repository/product.repository'
import { prisma } from '../../../../src/app.module'
import { Product } from '../../../../src/products/domain/entity/product.entity'
import { Uuid } from 'src/shared/domain/value-object/uuid.value-object'
import { TestApi } from 'tests/test-api'

describe('Get product controller', () => {
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

  it('Get product by id from fake product repository', async () => {
    const product = Product.fromPrimitives({
      id: Uuid.create().value,
      name: faker.string.alpha({ length: { min:3, max: 30 } }),
      price: Number(faker.finance.amount()),
      inStock: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    await testApi.configureModuleBuilder(
      (testingModuleBuilder: TestingModuleBuilder) => {
        return testingModuleBuilder
          .overrideProvider(productRepositoryDefinition.name)
          .useValue(new FakeProductRepository([product]))
          .compile()
      },
    )

    await testApi
      .request()
      .get(`/product/${product.id.value}`)
      .expect(HttpStatus.OK)
      .expect({
        id: product.id.value,
        name: product.name.value,
        price: product.price.value,
        inStock: product.inStock.value,
        createdAt: product.createdAt.toISOString(),
      })
  })

  it('Get product by id from Prisma database', async () => {
    const timestamp = new Date('2020-01-01')
    const product = Product.fromPrimitives({
      id: Uuid.create().value,
      name: faker.string.alpha({ length: { min:3, max: 30 } }),
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
      .get(`/product/${product.id.value}`)
      .expect(HttpStatus.OK)
      .expect({
        id: product.id.value,
        name: product.name.value,
        price: product.price.value,
        inStock: product.inStock.value,
        createdAt: product.createdAt.toISOString(),
      })
  })

  it('Should return not found when product does not exist', async () => {
    await testApi
      .request()
      .get(`/product/${faker.string.uuid()}`)
      .expect(HttpStatus.NOT_FOUND)
  })
})
