import { dependecyContainer } from 'container';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { ModelsController } from '../controllers';

const modelsController = dependecyContainer.resolve(ModelsController);

export const modelsRouter = function (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: (error?: Error) => void,
) {
  fastify.post('/', modelsController.create);
  // fastify.get('/', brandsController.list);
  fastify.get('/:id', modelsController.show);

  done();
};
