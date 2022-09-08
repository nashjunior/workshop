import { dependecyContainer } from '../../../../../container';
import { FastifyReply, FastifyRequest } from 'fastify';
import { IRequestQueryType } from '../../../../../interfaces/requests';
import { injectable } from 'tsyringe';
import {
  CreateVehicleService,
  FindVehicleByIDService,
  FindVehiclesService,
} from '../useCases';

type BodyType = {
  id_model: string;
  fabrication_year: number;
  model_year: number;
  description: string;
  type: string;
};

@injectable()
export class VehiclesController {
  async create(
    {
      body: {
        description,
        fabrication_year: fabricationYear,
        model_year: modelYear,
        id_model: idModel,
        type,
      },
    }: FastifyRequest<{ Body: BodyType }>,
    response: FastifyReply,
  ) {
    const createVehicleService =
      dependecyContainer.resolve(CreateVehicleService);

    const vehicle = await createVehicleService.execute({
      createdBy: '123',
      fabricationYear,
      idModel,
      description,
      modelYear,
      type,
    });

    return response.status(201).send(vehicle);
  }

  async show(
    request: FastifyRequest<{ Params: { id: string } }>,
    response: FastifyReply,
  ) {
    const { id } = request.params;
    const findVehicleByIDService = dependecyContainer.resolve(
      FindVehicleByIDService,
    );

    const vehicle = await findVehicleByIDService.execute(id);

    return response.send(vehicle);
  }

  async list(
    request: FastifyRequest<{ Querystring: IRequestQueryType }>,
    response: FastifyReply,
  ) {
    const {
      query,
      deleted,
      page,
      perPage,
      'query_fields[]': queryFields,
      'order_sort[]': orderSort,
      'sort[]': sort,
    } = request.query;

    let sortedFields: string[] = [];
    const sortedFieldsType: string[] = [];

    if (Array.isArray(sort)) sortedFields = sort;
    else if (sort) sortedFields.push(sort);

    if (Array.isArray(orderSort)) sortedFields = orderSort;
    else if (orderSort) sortedFields.push(orderSort);

    const findVehiclesService = dependecyContainer.resolve(FindVehiclesService);
    const vehicles = await findVehiclesService.execute({
      deleted: !!deleted,
      queryFields: Array.isArray(queryFields) ? queryFields : [queryFields],
      query,
      sortedFields,
      sortedFieldsType,
      page,
      perPage,
    });

    return response.send(vehicles);
  }
}
