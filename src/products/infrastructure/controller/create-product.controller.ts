import { Controller, HttpStatus, Post, Req, Res } from '@nestjs/common'
import { CreateProduct } from 'src/products/application/use-case/create-product.use-case'
import { Request, Response } from 'express'
import { ProductName } from 'src/products/domain/value-object/product-name.value-object'
import { ProductPrice } from 'src/products/domain/value-object/product-price.value-object'
import { ProductInStock } from 'src/products/domain/value-object/product-in-stock.value-object'
import { ProductNameException } from '../../domain/exception/product-name.exception'
import { InvalidArgumentException } from '../../../../src/shared/domain/exception/invalid-argument.exception'
import { ProductPriceException } from '../../domain/exception/product-price.exception'
import { ProductInStockException } from '../../domain/exception/product-in-stock.exception'

@Controller('product')
export class CreateProductController {
  constructor(private readonly createProduct: CreateProduct) {}

  @Post()
  public async execute(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      await this.createProduct.execute(
        ProductName.fromString(request.body.name),
        ProductPrice.fromNumber(request.body.price),
        ProductInStock.fromBoolean(request.body.inStock),
      )

      return response.status(HttpStatus.CREATED).json()
    } catch (error: any) {
      if (
        error instanceof ProductNameException ||
        error instanceof ProductPriceException ||
        error instanceof ProductInStockException ||
        error instanceof InvalidArgumentException
      ) {
        return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
          message: error.message,
        })
      }

      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send()
    }
  }
}
