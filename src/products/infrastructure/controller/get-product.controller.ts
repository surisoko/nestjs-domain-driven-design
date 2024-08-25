import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common'
import { GetProductById } from '../../application/use-case/get-product.use-case'
import { Request, Response } from 'express'
import { ProductId } from 'src/products/domain/value-object/product-id.value-object'
import { ProductNotFoundException } from 'src/products/domain/exception/product-not-found.exception'
import { ProductNameException } from 'src/products/domain/exception/product-name.exception'
import { ProductPriceException } from 'src/products/domain/exception/product-price.exception'
import { InvalidArgumentException } from 'src/shared/domain/exception/invalid-argument.exception'

@Controller('product/:id')
export class GetProductController {
  constructor(private readonly getProductById: GetProductById) {}

  @Get()
  public async get(@Req() request: Request, @Res() response: Response) {
    try {
      const productRepresentation = await this.getProductById.execute(
        ProductId.fromString(request.params.id),
      )

      return response.json(productRepresentation).status(HttpStatus.OK)
    } catch (error: unknown) {
      if (error instanceof ProductNotFoundException) {
        return response.status(HttpStatus.NOT_FOUND).send()
      }

      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send()
    }
  }
}
