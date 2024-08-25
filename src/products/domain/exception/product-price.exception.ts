export class ProductPriceException extends Error {
  public static tooHigh(): ProductPriceException {
    return new this('Product price is to high')
  }
}
