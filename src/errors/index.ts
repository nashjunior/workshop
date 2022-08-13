export * from './FieldValidation';
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { FieldValidation } from './FieldValidation';

export const errorMiddleware = (
  err: FastifyError,
  req: FastifyRequest,
  res: FastifyReply,
) => {
  if (err instanceof FieldValidation) {
    res.status(err.statusCode).send({
      statusCode: err.statusCode,
      error: 'Could not Process request',
      message: JSON.parse(err.message),
    });
  }

  res.status(500).send({
    statusCode: 500,
    error: 'Internal server Error',
    message: err?.message,
  });
};
