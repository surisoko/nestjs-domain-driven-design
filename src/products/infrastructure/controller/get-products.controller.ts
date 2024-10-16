import { Controller, Get, HttpStatus, Response } from '@nestjs/common'
import { GetProducts } from 'src/products/application/use-case/get-products.use-case'

@Controller('/products')
export class GetProductsController {
  public constructor(private readonly getProducts: GetProducts) {}

  @Get()
  public async execute(@Response() response): Promise<Response> {
    try {
      const productsRepresentation = await this.getProducts.execute()

      return response.status(HttpStatus.OK).json(productsRepresentation)
    } catch (error: any) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json()
    }
  }
}
