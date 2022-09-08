import { dependecyContainer } from '../../../../../container';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { PartsController } from '../controllers';
import { FastifyMultipartOptions } from '@fastify/multipart';

const partsController = dependecyContainer.resolve(PartsController);

export const partsRouter = function (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: (error?: Error) => void,
) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  fastify.register(require('@fastify/multipart'), {
    addToBody: true,
  } as FastifyMultipartOptions);
  fastify.post('/', partsController.create);
  fastify.get('/', partsController.list);
  fastify.get('/:id', partsController.show);

  done();
};
