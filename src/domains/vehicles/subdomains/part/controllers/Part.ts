import { dependecyContainer } from '../../../../../container';
import { FastifyReply, FastifyRequest } from 'fastify';
import {
  CreatePartService,
  FindPartByUUIDService,
  FindPartsService,
} from '../useCases';
import { injectable } from 'tsyringe';
import { IRequestQueryType } from '../../../../../interfaces/requests';

type BodyType = {
  name: string;
  description?: string;
  measure_unit: number;
};

@injectable()
export class PartsController {
  async create(
    {
      body: { name, description, measure_unit: measureUnit },
    }: FastifyRequest<{ Body: BodyType }>,
    response: FastifyReply,
  ) {
    const createBrandService = dependecyContainer.resolve(CreatePartService);

    const part = await createBrandService.execute({
      createdBy: '123',
      name,
      description,
      measureUnit,
    });

    return response.status(201).send(part);
  }

  async show(
    { params: { id } }: FastifyRequest<{ Params: { id: string } }>,
    response: FastifyReply,
  ) {
    const findPartByUUIDService = dependecyContainer.resolve(
      FindPartByUUIDService,
    );

    const part = await findPartByUUIDService.execute(id);

    return response.send(part);
  }

  async list(
    request: FastifyRequest<{ Querystring: IRequestQueryType }>,
    response: FastifyReply,
  ) {
    const {
      'order_sort[]': order_sort,
      query,
      'sort[]': sort,
      deleted,
      page,
      perPage,
      'query_fields[]': queryFields,
    } = request.query;

    let sortFields: string[] = [];
    let orderSort: ('ASC' | 'DESC')[] = [];

    if (Array.isArray(sort)) sortFields = sort;
    else if (sort) sortFields.push(sort);

    if (Array.isArray(order_sort)) orderSort = order_sort;
    else if (sort) sortFields.push(order_sort);

    const findPartsService = dependecyContainer.resolve(FindPartsService);
    const parts = await findPartsService.execute({
      deleted: Boolean(deleted),
      queryFields: Array.isArray(queryFields) ? queryFields : [queryFields],
      query,
      sortedFields: sortFields,
      sortedFieldsType: orderSort,
      page,
      perPage,
    });

    return response.send(parts);
  }
}
