import { dependecyContainer } from '../../../../../container';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateModelService, FindModelByUUIDService } from '../useCases';

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

  async show(
    request: FastifyRequest<{ Params: { id: string } }>,
    response: FastifyReply,
  ) {
    const { id } = request.params;

    const findModelByUUIDService = dependecyContainer.resolve(
      FindModelByUUIDService,
    );

    const brand = await findModelByUUIDService.execute(id);

    return response.send(brand);
  }
}
