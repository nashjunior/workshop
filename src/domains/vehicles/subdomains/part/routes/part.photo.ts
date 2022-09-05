import { dependecyContainer } from '../../../../../container';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { PartsPhotosController } from '../controllers';
import { FastifyMultipartOptions } from '@fastify/multipart';

const partsController = dependecyContainer.resolve(PartsPhotosController);

export const partsPhotosRouter = function (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: (error?: Error) => void,
) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  fastify.register(require('@fastify/multipart'), {
    addToBody: true,
  } as FastifyMultipartOptions);
  fastify.post('/', partsController.create);
  // fastify.get('/', modelsController.list);
  // fastify.get('/:id', partsController.show);

  done();
};
