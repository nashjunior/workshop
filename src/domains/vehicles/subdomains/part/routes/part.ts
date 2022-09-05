import { dependecyContainer } from '../../../../../container';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { PartsController } from '../controllers';

const partsController = dependecyContainer.resolve(PartsController);

export const partsRouter = function (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: (error?: Error) => void,
) {
  fastify.post('/', partsController.create);
  // fastify.get('/', modelsController.list);
  fastify.get('/:id', partsController.show);

  done();
};
