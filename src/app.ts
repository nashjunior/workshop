import Fastify from 'fastify';
import { errorMiddleware } from './errors';
import fastifyCors from '@fastify/cors';

const server = Fastify({
  logger: true,
  bodyLimit: 20000,
});

server.register(fastifyCors);

server.setErrorHandler(errorMiddleware);

export { server };
