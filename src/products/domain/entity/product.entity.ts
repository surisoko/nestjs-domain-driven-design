import { AggregateRoot } from 'src/shared/domain/event/aggregate-root'
import { ProductCreated } from '../event/product-created.event'
import { ProductName } from '../value-object/product-name.value-object'
import { ProductPrice } from '../value-object/product-price.value-object'
import { ProductInStock } from '../value-object/product-in-stock.value-object'
import { ProductId } from '../value-object/product-id.value-object'

export class Product extends AggregateRoot {
  private constructor(
    public id: ProductId,
    public name: ProductName,
    public price: ProductPrice,
    public inStock: ProductInStock,
    public createdAt: Date,
    public updatedAt: Date,
  ) {
    super()
  }

  public static fromPrimitives({
    id,
    name,
    price,
    inStock,
    createdAt,
    updatedAt,
  }: {
    id: string
    name: string
    price: number
    inStock: boolean
    createdAt: Date
    updatedAt: Date
  }): Product {
    return new this(
      ProductId.fromString(id),
      ProductName.fromString(name),
      ProductPrice.fromNumber(price),
      ProductInStock.fromBoolean(inStock),
      createdAt,
      updatedAt,
    )
  }

  public static create({
    name,
    price,
    inStock,
  }: {
    name: ProductName
    price: ProductPrice
    inStock: ProductInStock
  }): Product {
    const currentDate = new Date()
    const product = new this(
      ProductId.create(),
      name,
      price,
      inStock,
      currentDate,
      currentDate,
    )

    product.record(new ProductCreated(product))

    return product
  }

  public toPrimitives(): ProductPrimitives {
    return {
      id: this.id.value,
      name: this.name.value,
      price: this.price.value,
      inStock: this.inStock.value,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}

export type ProductPrimitives = {
  id: string
  name: string
  price: number
  inStock: boolean
  createdAt: Date
  updatedAt: Date
}
