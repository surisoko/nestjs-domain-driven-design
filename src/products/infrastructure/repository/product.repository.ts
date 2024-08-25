import { Injectable } from '@nestjs/common'
import { prisma } from '../../../app.module'
import { Product } from '../../domain/entity/product.entity'
import { ProductRepository } from 'src/products/domain/repository/product.repository'
import { ProductId } from 'src/products/domain/value-object/product-id.value-object'
import { ProductNotFoundException } from 'src/products/domain/exception/product-not-found.exception'
import { ProductsToDomainParser } from '../parser/products-to-domain.parser'

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  async findById(id: ProductId): Promise<Product> {
    try {
      const product = await prisma.product.findFirstOrThrow({
        where: {
          id: id.value,
          deletedAt: null,
        },
      })

      return Product.fromPrimitives({
        id: product.id,
        name: product.name,
        price: product.price.toNumber(),
        inStock: product.inStock,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      })
    } catch (error: any) {
      throw ProductNotFoundException.execute(id)
    }
  }

  async findAll(): Promise<Product[]> {
    const products = await prisma.product.findMany({
      where: {
        deletedAt: null,
      },
    })

    return ProductsToDomainParser.execute(products)
  }

  async create(product: Product): Promise<void> {
    await prisma.product.create({
      data: product.toPrimitives(),
    })
  }
}
