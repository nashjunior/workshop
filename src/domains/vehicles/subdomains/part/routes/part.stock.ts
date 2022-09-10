import { dependecyContainer } from '../../../../../container';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { PartsStocksController } from '../controllers';

const partsStocksController = dependecyContainer.resolve(PartsStocksController);

export const partsStocksRouter = function (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: (error?: Error) => void,
) {
  fastify.post('/', partsStocksController.create);
  // fastify.get('/', modelsController.list);
  // fastify.get('/:id', partsController.show);

  done();
};
