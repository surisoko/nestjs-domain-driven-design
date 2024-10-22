import { faker } from '@faker-js/faker'
import { prisma } from 'src/app.module'
import { CreateProduct } from 'src/products/application/use-case/create-product.use-case'
import { ProductCreated } from '../../../../src/products/domain/event/product-created.event'
import { ProductInStock } from 'src/products/domain/value-object/product-in-stock.value-object'
import { ProductName } from 'src/products/domain/value-object/product-name.value-object'
import { ProductPrice } from 'src/products/domain/value-object/product-price.value-object'
import { PrismaProductRepository } from 'src/products/infrastructure/repository/product.repository'
import { FakeEventBus } from 'tests/shared/infrastructure/service/fake-event-bus.service'

describe('Create product use case', () => {
  beforeEach(async () => {
    const products = prisma.product.deleteMany()
    await prisma.$transaction([products])
  })

  afterAll(async () => {
    const products = prisma.product.deleteMany()
    await prisma.$transaction([products])
    await prisma.$disconnect()
  })

  it('create new product', async () => {
    const fakeEventBus = new FakeEventBus()
    const createProductUseCase = new CreateProduct(
      new PrismaProductRepository(),
      fakeEventBus,
    )
    const productName = ProductName.fromString(
      faker.string.alpha({ length: { min: 3, max: 30 } }),
    )
    const productPrice = ProductPrice.fromNumber(
      faker.number.float({ multipleOf: 0.01 }),
    )
    const productInStock = ProductInStock.fromBoolean(true)

    await createProductUseCase.execute(
      productName,
      productPrice,
      productInStock,
    )

    const products = await prisma.product.findMany()
    const product = products[0]

    expect(products.length).toBe(1)
    expect(product.id).not.toBeNull()
    expect(product.name).toEqual(productName.value)
    expect(product.price.toNumber()).toEqual(productPrice.value)
    expect(product.inStock).toEqual(productInStock.value)
    expect(product.createdAt).not.toBeNull()
    expect(product.updatedAt).not.toBeNull()
    expect(product.deletedAt).toBeNull()

    expect(fakeEventBus.wasPublished).toBeTruthy()
    expect(fakeEventBus.currentEvent).toBeInstanceOf(ProductCreated)
  })
})
