import { GarageDataSource } from '@database/sources';
import { VehiclePart } from '@domains/vehicles/entites';
import { IVehiclesPartsRepository } from '../interfaces';
import { v4 as uuidV4 } from 'uuid';

export const VehiclesPartTypeormRepository = GarageDataSource.getRepository(
  VehiclePart,
).extend<IVehiclesPartsRepository>({
  async createMany(idVehicle, dtos) {
    const instances = dtos.map(dto =>
      this.create({ ...dto, idVehicle, id: uuidV4() }),
    );

    return this.save(instances);
  },
});
