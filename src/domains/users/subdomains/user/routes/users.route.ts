import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { UserController } from '../controllers';

const userController = new UserController();

export const userRouter = function (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: (error?: Error) => void,
) {
  fastify.post('/', userController.create);

  done();
};
