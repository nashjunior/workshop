import { dependecyContainer } from 'container';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { VehiclesController } from '../controllers';

const vehiclesController = dependecyContainer.resolve(VehiclesController);

export const vehiclesRouter = function (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: (error?: Error) => void,
) {
  fastify.post('/', vehiclesController.create);
  // fastify.get('/', vehiclesController.list);
  fastify.get('/:id', vehiclesController.show);

  done();
};
