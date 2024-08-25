export class ProductNameException extends Error {
  public static tooLong(): ProductNameException {
    return new this('Product name is to long')
  }

  public static tooShort(): ProductNameException {
    return new this('Product name is to short')
  }
}
