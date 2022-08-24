import { dependecyContainer } from 'container';
import { FastifyReply, FastifyRequest } from 'fastify';
import { injectable } from 'tsyringe';
import { CreateVehicleService, FindVehicleByIDService } from '../useCases';

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
}
