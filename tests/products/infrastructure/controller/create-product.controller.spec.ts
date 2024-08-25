import { TestingModuleBuilder } from '@nestjs/testing'
import { HttpStatus } from '@nestjs/common'
import { faker } from '@faker-js/faker'
import { prisma } from '../../../../src/app.module'
import { TestApi } from 'tests/test-api'
import { eventBusDefinition } from 'src/shared/domain/service/event-bus.service'
import { FakeEventBus } from 'tests/shared/infrastructure/service/fake-event-bus.service'
import { ProductCreated } from '../../../../src/products/domain/event/product-created.event'
import { ProductNameException } from 'src/products/domain/exception/product-name.exception'
import { ProductPrice } from 'src/products/domain/value-object/product-price.value-object'
import { ProductPriceException } from 'src/products/domain/exception/product-price.exception'
import { ProductInStockException } from 'src/products/domain/exception/product-in-stock.exception'

describe('Create product controller', () => {
  let testApi: TestApi
  const ENDPOINT = '/product'

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

  it('create new product', async () => {
    const newProduct = {
      name: faker.string.alpha({ length: { min:3, max: 30 } }),
      price: faker.number.float({ multipleOf: 0.01 }),
      inStock: true,
    }
    const fakeEventBus = new FakeEventBus()
    await testApi.configureModuleBuilder(
      (testingModuleBuilder: TestingModuleBuilder) => {
        return testingModuleBuilder
          .overrideProvider(eventBusDefinition.name)
          .useValue(fakeEventBus)
          .compile()
      },
    )

    await testApi
      .request()
      .post(ENDPOINT)
      .send(newProduct)
      .expect(HttpStatus.CREATED)

    const products = await prisma.product.findMany()
    const product = products[0]

    expect(products.length).toBe(1)
    expect(product.id).not.toBeNull()
    expect(product.name).toEqual(newProduct.name)
    expect(product.price.toNumber()).toEqual(newProduct.price)
    expect(product.inStock).toEqual(newProduct.inStock)
    expect(product.createdAt).not.toBeNull()
    expect(product.updatedAt).not.toBeNull()
    expect(product.deletedAt).toBeNull()

    expect(fakeEventBus.wasPublished).toBeTruthy()
    expect(fakeEventBus.currentEvent).toBeInstanceOf(ProductCreated)
  })

  it("product name can't be less than 3 characters", async () => {
    await testApi
      .request()
      .post(ENDPOINT)
      .send({
        name: faker.string.alpha({ length: 2 }),
        price: faker.number.float({ multipleOf: 0.01 }),
        inStock: true,
      })
      .expect(HttpStatus.UNPROCESSABLE_ENTITY)
      .expect({ message: ProductNameException.tooShort().message })
  })

  it("product name can't be greatest than 30 characters", async () => {
    await testApi
      .request()
      .post(ENDPOINT)
      .send({
        name: faker.string.alpha({ length: 31 }),
        price: faker.number.float({ multipleOf: 0.01 }),
        inStock: true,
      })
      .expect(HttpStatus.UNPROCESSABLE_ENTITY)
      .expect({ message: ProductNameException.tooLong().message })
  })

  it(`product price can't be greatest than ${ProductPrice.maxPrice}`, async () => {
    await testApi
      .request()
      .post(ENDPOINT)
      .send({
        name: faker.string.alpha({ length: { min:3, max: 30 } }),
        price: ProductPrice.maxPrice + 1,
        inStock: true,
      })
      .expect(HttpStatus.UNPROCESSABLE_ENTITY)
      .expect({ message: ProductPriceException.tooHigh().message })
  })

  it('product in stock must be boolean', async () => {
    await testApi
      .request()
      .post(ENDPOINT)
      .send({
        name: faker.string.alpha({ length: { min:3, max: 30 } }),
        price: faker.number.float({ multipleOf: 0.01 }),
        inStock: 1,
      })
      .expect(HttpStatus.UNPROCESSABLE_ENTITY)
      .expect({
        message: ProductInStockException.mustBeBoolean().message,
      })
  })
})
