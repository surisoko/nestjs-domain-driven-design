export class ProductInStockException extends Error {
  public static mustBeBoolean(): ProductInStockException {
    return new this('Product in stock must be boolean')
  }
}
