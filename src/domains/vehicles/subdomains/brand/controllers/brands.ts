import { dependecyContainer } from 'container';
import { FastifyRequest, FastifyReply } from 'fastify';
import { IRequestQueryType } from '../../../../../interfaces/requests';
import { CreateBrandService, FindBrandsService } from '../useCases';
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

  async list(
    request: FastifyRequest<{ Querystring: IRequestQueryType }>,
    response: FastifyReply,
  ) {
    const { order_sort, query, query_fields, sort, deleted, page, perPage } =
      request.query;

    const findBrandsService = dependecyContainer.resolve(FindBrandsService);
    const brands = await findBrandsService.execute({
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
