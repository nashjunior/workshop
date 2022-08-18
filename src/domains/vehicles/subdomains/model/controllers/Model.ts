import { dependecyContainer } from '../../../../../container';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateModelService, FindModelByUUIDService } from '../useCases';
import { IRequestQueryType } from '../../../../../interfaces/requests';
import { FindModelsService } from '../useCases';

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

  async list(
    request: FastifyRequest<{ Querystring: IRequestQueryType }>,
    response: FastifyReply,
  ) {
    const { order_sort, query, query_fields, sort, deleted, page, perPage } =
      request.query;

    const findModelsService = dependecyContainer.resolve(FindModelsService);
    const brands = await findModelsService.execute({
      deleted: Boolean(deleted),
      queryFields: Array.isArray(query_fields) ? query_fields : [query_fields],
      query,
      sortedFields: Array.isArray(sort) ? sort : [sort],
      sortedFieldsType: Array.isArray(order_sort) ? order_sort : [order_sort],
      page,
      perPage,
    });

    return response.send(brands);
  }
}
