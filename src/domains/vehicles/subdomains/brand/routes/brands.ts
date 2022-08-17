import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { BrandsController } from '../controllers/brands';

const brandsController = new BrandsController();

export const brandsRouter = function (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: (error?: Error) => void,
) {
  fastify.post('/', brandsController.create);
  fastify.get('/:id', brandsController.show);

  done();
};
