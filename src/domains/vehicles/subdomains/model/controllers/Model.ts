import { dependecyContainer } from '../../../../../container';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateModelService } from '../useCases';

type BodyType = { name: string; id_brand: string };

export class ModelsController {
  async create(
    request: FastifyRequest<{ Body: BodyType }>,
    response: FastifyReply,
  ) {
    const { name, id_brand } = request.body;

    const createBrandService = dependecyContainer.resolve(CreateModelService);

    const model = await createBrandService.execute({
      createdBy: '123',
      name,
      idBrand: id_brand,
    });

    return response.status(201).send(model);
  }
}
