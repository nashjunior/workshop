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
    const {
      order_sort,
      query,
      sort,
      deleted,
      page,
      perPage,
      'query_fields[]': queryFields,
    } = request.query;

    let sortedFields: string[] = [];
    const sortedFieldsType: string[] = [];

    if (Array.isArray(sort)) sortedFields = sort;
    else if (sort) sortedFields.push(sort);

    if (Array.isArray(order_sort)) sortedFields = order_sort;
    else if (order_sort) sortedFields.push(order_sort);

    const findModelsService = dependecyContainer.resolve(FindModelsService);
    const brands = await findModelsService.execute({
      deleted: Boolean(deleted),
      queryFields: Array.isArray(queryFields) ? queryFields : [queryFields],
      query,
      sortedFields,
      sortedFieldsType,
      page,
      perPage,
    });

    return response.send(brands);
  }
}
