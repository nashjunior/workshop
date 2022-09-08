import { dependecyContainer } from '../../../../../container';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { VehiclePartsController } from '../controllers';

const vehiclesController = dependecyContainer.resolve(VehiclePartsController);

export const vehiclePartsRouter = function (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: (error?: Error) => void,
) {
  fastify.post('/', vehiclesController.create);
  // fastify.get('/', vehiclesController.list);
  // fastify.get('/:id', vehiclesController.show);

  done();
};
