import { dependecyContainer } from '../../../../../container';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserService } from '../useCases';

type CreateRequestType = {
  name: string;
  cpf_cnpj: string;
  type: 0 | 1 | 2;
};

export class UserController {
  async create(
    request: FastifyRequest<{ Body: CreateRequestType }>,
    response: FastifyReply,
  ) {
    const { cpf_cnpj, name, type } = request.body;

    const createUserService = dependecyContainer.resolve(CreateUserService);

    const user = await createUserService.execute({
      name,
      cpfCnpj: cpf_cnpj,
      criado_por: 'aeuhae',
      type,
    });

    return response.status(201).send(user);
  }
}
