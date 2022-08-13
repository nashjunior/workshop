import { EntityNotFoundError } from 'typeorm';

export class EntityNotFound extends Error {
  public readonly statusCode = 404;

  constructor(error: EntityNotFoundError) {
    super(error.message);
    this.name = error.name;
  }
}
