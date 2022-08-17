import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { BrandsController } from '../controllers/brands';

export const brandsRouter = function (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: (error?: Error) => void,
) {
  fastify.post('/', new BrandsController().create);

  done();
};
