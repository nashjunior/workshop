import { dependecyContainer } from 'container';
import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateBrandService } from '../useCases';
import { FindBrandByUUIDService } from '../useCases/findByUUID';

type BodyType = { name: string };

export class BrandsController {
  async create(
    request: FastifyRequest<{ Body: BodyType }>,
    response: FastifyReply,
  ) {
    const { name } = request.body;

    const createBrandService = dependecyContainer.resolve(CreateBrandService);

    const brand = await createBrandService.execute({
      createdBy: '123',
      name,
    });

    return response.status(201).send(brand);
  }

  async show(
    request: FastifyRequest<{ Params: { id: string } }>,
    response: FastifyReply,
  ) {
    const { id } = request.params;

    const findBrandByUUIDService = dependecyContainer.resolve(
      FindBrandByUUIDService,
    );

    const brand = await findBrandByUUIDService.execute(id);

    return response.send(brand);
  }
}
