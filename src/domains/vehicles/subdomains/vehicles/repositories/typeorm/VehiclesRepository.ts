import { GarageDataSource } from '@database/sources';
import { Vehicle } from '@domains/vehicles/entites';
import { IVehiclesRepository } from '../interfaces/IVehiclesRepository';
import { v4 as uuidV4 } from 'uuid';

export const VehiclesTypeormRepository = GarageDataSource.getRepository(
  Vehicle,
).extend<IVehiclesRepository>({
  createOne(dto) {
    const instance = this.create({
      ...dto,
      id: uuidV4(),
    });

    return this.save(instance);
  },

  findByUUID(id) {
    return this.findOneOrFail({
      where: { id },
      relations: ['model', 'model.brand'],
    });
  },
});
