import Fastify from 'fastify';
import { errorMiddleware } from './errors';
import fastifyCors from '@fastify/cors';
import { FastifyStaticOptions } from '@fastify/static';
import path from 'path';

const server = Fastify({
  logger: true,
  bodyLimit: 20000,
});

server.register(fastifyCors);

server.setErrorHandler(errorMiddleware);

// eslint-disable-next-line @typescript-eslint/no-var-requires
server.register<FastifyStaticOptions>(require('@fastify/static'), {
  root: path.join(__dirname, '..', 'uploads'),
  prefix: '/uploads/',
});

export { server };
