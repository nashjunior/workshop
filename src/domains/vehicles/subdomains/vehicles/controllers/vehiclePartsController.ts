import { dependecyContainer } from '../../../../../container';
import { FastifyReply, FastifyRequest } from 'fastify';
import { injectable } from 'tsyringe';
import {
  CreateVehiclePartsService,
  FindVehiclePartsByIdVehicleService,
} from '../useCases';
import { IRequestQueryType } from 'interfaces/requests';

type BodyType = { id_vehicle: string; ids_parts: string[] };

@injectable()
export class VehiclePartsController {
  async create(
    {
      body: { id_vehicle: idVehicle, ids_parts: idsParts },
    }: FastifyRequest<{ Body: BodyType }>,
    response: FastifyReply,
  ) {
    const createVehiclePartsService = dependecyContainer.resolve(
      CreateVehiclePartsService,
    );

    const vehicle = await createVehiclePartsService.execute({
      createdBy: '123',
      idsParts,
      idVehicle,
    });

    return response.status(201).send(vehicle);
  }

  async listByIdVehicle(
    {
      params: { id },
      query: {
        query,
        page,
        perPage,
        'query_fields[]': queryFields,
        'order_sort[]': orderSort,
        'sort[]': sort,
      },
    }: FastifyRequest<{
      Params: { id: string };
      Querystring: IRequestQueryType;
    }>,
    response: FastifyReply,
  ) {
    let sortedFields: string[] = [];
    const sortedFieldsType: string[] = [];

    if (Array.isArray(sort)) sortedFields = sort;
    else if (sort) sortedFields.push(sort);

    if (Array.isArray(orderSort)) sortedFields = orderSort;
    else if (orderSort) sortedFields.push(orderSort);

    const findVehiclePartsByIdVehicleService = dependecyContainer.resolve(
      FindVehiclePartsByIdVehicleService,
    );
    const vehicleParts = await findVehiclePartsByIdVehicleService.execute({
      queryFields: Array.isArray(queryFields) ? queryFields : [queryFields],
      query,
      sortedFields,
      sortedFieldsType,
      page,
      perPage,
      id,
    });

    return response.send(vehicleParts);
  }
}
