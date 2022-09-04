import { dependecyContainer } from '../../../../../container';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CreatePartService } from '../useCases';
import { injectable } from 'tsyringe';

type BodyType = { name: string; description?: string };

@injectable()
export class PartsController {
  async create(
    request: FastifyRequest<{ Body: BodyType }>,
    response: FastifyReply,
  ) {
    const { name, description } = request.body;

    const createBrandService = dependecyContainer.resolve(CreatePartService);

    const part = await createBrandService.execute({
      createdBy: '123',
      name,
      description,
    });

    return response.status(201).send(part);
  }
}
