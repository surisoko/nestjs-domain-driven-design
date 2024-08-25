import { faker } from '@faker-js/faker'
import { prisma } from 'src/app.module'
import { GetProductById } from 'src/products/application/use-case/get-product.use-case'
import { Product } from 'src/products/domain/entity/product.entity'
import { ProductNotFoundException } from 'src/products/domain/exception/product-not-found.exception'
import { ProductId } from 'src/products/domain/value-object/product-id.value-object'
import { PrismaProductRepository } from 'src/products/infrastructure/repository/product.repository'
import { Uuid } from 'src/shared/domain/value-object/uuid.value-object'

describe('Get product use case', () => {
  beforeEach(async () => {
    const products = prisma.product.deleteMany()
    await prisma.$transaction([products])
  })

  afterAll(async () => {
    const products = prisma.product.deleteMany()
    await prisma.$transaction([products])
    await prisma.$disconnect()
  })

  it('get product by id', async () => {
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
      data: product.toPrimitives(),
    })

    const getProductUseCase = new GetProductById(new PrismaProductRepository())
    const productRepresentation = await getProductUseCase.execute(product.id)

    expect(productRepresentation.id).toEqual(product.id.value)
    expect(productRepresentation.name).toEqual(product.name.value)
    expect(productRepresentation.inStock).toEqual(product.inStock.value)
    expect(productRepresentation.createdAt).toEqual(
      product.createdAt.toISOString(),
    )
  })

  it("throw product not found exception if product doesn't exist", async () => {
    const productId = ProductId.create()
    const getProductUseCase = new GetProductById(new PrismaProductRepository())

    await expect(getProductUseCase.execute(productId)).rejects.toThrow(
      ProductNotFoundException.execute(productId),
    )
  })
})
