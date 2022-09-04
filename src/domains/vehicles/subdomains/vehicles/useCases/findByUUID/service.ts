import { EntityNotFound } from '../../../../../../errors';
import { inject, injectable } from 'tsyringe';
import { EntityNotFoundError } from 'typeorm';
import { modelVehicleToApi } from '../../mapper';
import { IVehiclesRepository } from '../../repositories';

@injectable()
export class FindVehicleByIDService {
  constructor(
    @inject('VehiclesTypeormRepository')
    private vehiclesRepository: IVehiclesRepository,
  ) {}

  async execute(id: string) {
    try {
      const vehicle = await this.vehiclesRepository.findByUUID(id);

      return modelVehicleToApi(vehicle);
    } catch (error) {
      if (error instanceof EntityNotFoundError) throw new EntityNotFound(error);

      throw error;
    }
  }
}
