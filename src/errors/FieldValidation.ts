import { ValidationError } from 'yup';

export class FieldValidation extends Error {
  protected readonly statusCode = 422;
  constructor({ errors }: ValidationError) {
    super(JSON.stringify(errors));
  }
}
