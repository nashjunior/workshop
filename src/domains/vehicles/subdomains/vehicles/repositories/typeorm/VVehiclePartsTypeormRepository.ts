import { GarageDataSource } from '@database/sources';
import { VVehiclePart } from '@domains/vehicles/entites';
import { IVVehiclePartsRepository } from '../interfaces';

export const VVehiclePartsTypeormRepository = GarageDataSource.getRepository(
  VVehiclePart,
).extend<IVVehiclePartsRepository>({
  findByIdVehicle({ id, page, perPage }) {
    const hasPagination = page && perPage;

    return this.findAndCount({
      where: { idVehicle: id },
      skip: hasPagination ? page * perPage - perPage : undefined,
      take: hasPagination ? perPage : undefined,
    });
  },
});
