export class AppError extends Error {
  public readonly statusCode = 400;
  constructor(message: string) {
    super(message);
  }
}
