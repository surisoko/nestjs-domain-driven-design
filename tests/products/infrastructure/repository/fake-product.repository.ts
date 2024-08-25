import { Injectable } from '@nestjs/common'
import { Product } from '../../../../src/products/domain/entity/product.entity'
import { ProductRepository } from 'src/products/domain/repository/product.repository'
import { ProductId } from 'src/products/domain/value-object/product-id.value-object'

@Injectable()
export class FakeProductRepository implements ProductRepository {
  public constructor(private products: Product[]) {}

  public async findById(id: ProductId): Promise<Product> {
    return await new Promise<Product>((resolve) => {
      return resolve(
        this.products.find((product: Product) => product.id.equals(id)),
      )
    })
  }

  public async create(_: Product): Promise<void> {
    await new Promise<void>((resolve) => {
      return resolve()
    })
  }

  public async findAll(): Promise<Product[]> {
    return await new Promise<Product[]>((resolve) => {
      resolve(this.products)
    })
  }
}
