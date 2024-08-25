import { faker } from '@faker-js/faker'
import { prisma } from 'src/app.module'
import { GetProducts } from 'src/products/application/use-case/get-products.use-case'
import { Product } from 'src/products/domain/entity/product.entity'
import { ProductId } from 'src/products/domain/value-object/product-id.value-object'
import { PrismaProductRepository } from 'src/products/infrastructure/repository/product.repository'

describe('Get products use case', () => {
  beforeEach(async () => {
    const products = prisma.product.deleteMany()
    await prisma.$transaction([products])
  })

  afterAll(async () => {
    const products = prisma.product.deleteMany()
    await prisma.$transaction([products])
    await prisma.$disconnect()
  })

  it('get all products', async () => {
    const timestamp = new Date('2020-01-01')
    const product = Product.fromPrimitives({
      id: ProductId.create().value,
      name: faker.string.alpha({ length: { min:3, max: 30 } }),
      price: Number(faker.finance.amount()),
      inStock: true,
      createdAt: timestamp,
      updatedAt: timestamp,
    })
    await prisma.product.create({
      data: product.toPrimitives(),
    })

    const getProductsUseCase = new GetProducts(new PrismaProductRepository())

    const productsRepresentation = await getProductsUseCase.execute()
    const productRepresentation = productsRepresentation[0]

    expect(productsRepresentation.length).toBe(1)
    expect(productRepresentation.id).toEqual(product.id.value)
    expect(productRepresentation.name).toEqual(product.name.value)
    expect(productRepresentation.inStock).toEqual(product.inStock.value)
    expect(productRepresentation.createdAt).toEqual(
      product.createdAt.toISOString(),
    )
  })

  it('get empty products list', async () => {
    const getProductsUseCase = new GetProducts(new PrismaProductRepository())

    const productsRepresentation = await getProductsUseCase.execute()

    expect(productsRepresentation.length).toBe(0)
  })
})
