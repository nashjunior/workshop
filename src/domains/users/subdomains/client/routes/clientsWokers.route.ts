import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { ClientController } from '../controllers';

const clientController = new ClientController();

export const clientsRouter = function (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: (error?: Error) => void,
) {
  fastify.post('/', clientController.create);

  done();
};
