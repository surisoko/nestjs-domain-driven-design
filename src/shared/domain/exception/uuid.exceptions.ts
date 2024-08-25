export class UUIDException extends Error {
  public static invalid(): UUIDException {
    return new this('Invalid UUID')
  }
}
