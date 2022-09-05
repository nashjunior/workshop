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
};

@injectable()
export class VehiclesController {
  async create(
    request: FastifyRequest<{ Body: BodyType }>,
    response: FastifyReply,
  ) {
    const {
      description,
      fabrication_year: fabricationYear,
      model_year: modelYear,
      id_model: idModel,
    } = request.body;

    const createVehicleService =
      dependecyContainer.resolve(CreateVehicleService);

    const vehicle = await createVehicleService.execute({
      createdBy: '123',
      fabricationYear,
      idModel,
      description,
      modelYear,
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
