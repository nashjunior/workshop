import { dependecyContainer } from '../../../../../container';
import { FastifyReply, FastifyRequest } from 'fastify';
import { injectable } from 'tsyringe';
import { CreateVehiclePartsService } from '../useCases';

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
}
