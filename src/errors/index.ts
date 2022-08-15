export * from './FieldValidation';
export * from './EntityNotFound';
export * from './AppError';
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { AppError } from './AppError';
import { EntityNotFound } from './EntityNotFound';
import { FieldValidation } from './FieldValidation';

type ErrorType = {
  error: string;
  statusCode: number;
  message: any;
  where?: string;
};

export const errorMiddleware = (
  err: FastifyError,
  req: FastifyRequest,
  res: FastifyReply,
) => {
  console.log(err);

  let error: ErrorType = {
    statusCode: 500,
    error: 'Internal server Error',
    message: err?.message,
  };

  if (err instanceof FieldValidation) {
    error = {
      statusCode: err.statusCode,
      error: 'Could not Process request',
      message: JSON.parse(err.message),
    };
  }

  if (err instanceof EntityNotFound) {
    const [message, cause] = err.message.split('matching: ');

    error = {
      statusCode: err.statusCode,
      error: err.name,
      message,
      where: JSON.parse(cause)?.where,
    };
  }

  if (err instanceof AppError) {
    error = {
      error: 'Bad Request',
      message: err.message,
      statusCode: err.statusCode,
    };
  }

  res.status(error.statusCode).send(error);
};
