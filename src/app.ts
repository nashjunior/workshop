import Fastify from 'fastify';
import { errorMiddleware } from './errors';

const server = Fastify({
  logger: true,
  bodyLimit: 20000,
});

server.setErrorHandler(errorMiddleware);

export { server };
