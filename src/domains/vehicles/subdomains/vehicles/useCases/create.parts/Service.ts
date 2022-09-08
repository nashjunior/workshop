import { ICreateRequest } from '../../../../../../interfaces/requests';
import { inject, injectable } from 'tsyringe';
import {
  IPartsSubVehicleRepository,
  IVehiclesPartsRepository,
  IVehiclesRepository,
} from '../../repositories';
import { EntityNotFoundError } from 'typeorm';
import { AppError, EntityNotFound } from '../../../../../../errors';
import { createVehiclePartsSchema } from '../../schemas';
import { modelVehicleToApi } from '../../mapper';
import { manyModelVehiclePartsToAPI } from '../../mapper/vehicle.part';

type IRequestType = ICreateRequest & {
  idVehicle: string;
  idsParts: string[];
};

@injectable()
export class CreateVehiclePartsService {
  constructor(
    @inject('VehiclesPartTypeormRepository')
    private vehiclesPartsRepository: IVehiclesPartsRepository,

    @inject('VehiclesTypeormRepository')
    private vehiclesRepository: IVehiclesRepository,

    @inject('PartsSubVehicleTypeormRepository')
    private partsSubVehicleRepository: IPartsSubVehicleRepository,
  ) {}

  async execute({ createdBy, idVehicle, idsParts }: IRequestType) {
    try {
      const vehicle = await this.vehiclesRepository.findByUUID(idVehicle);

      await createVehiclePartsSchema.validate(
        { ids_parts: idsParts },
        { abortEarly: false },
      );

      const parts = await this.partsSubVehicleRepository.findMany(idsParts);

      const partsNotFounded = idsParts.filter(
        idPart => !parts.find(({ id }) => idPart.trim() === id.trim()),
      );

      if (!!partsNotFounded.length)
        throw new AppError(
          `Parts not founded: ${partsNotFounded.join(
            ',',
          )}. Please fix the request in order to create those vehicle parts`,
        );

      const vehicleParts = await this.vehiclesPartsRepository.createMany(
        vehicle.idVehicle,
        parts.map(({ idPart }) => ({ createdBy, idPart })),
      );

      const formatedVehicleParts = manyModelVehiclePartsToAPI(vehicleParts);

      return {
        ...modelVehicleToApi(vehicle),
        parts: formatedVehicleParts,
      };
    } catch (error) {
      if (error instanceof EntityNotFoundError) throw new EntityNotFound(error);
      throw error;
    }
  }
}
