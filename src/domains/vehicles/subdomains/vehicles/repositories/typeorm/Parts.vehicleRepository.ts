import { GarageDataSource } from '@database/sources';
import { Part } from '@domains/vehicles/entites';
import { In } from 'typeorm';
import { IPartsSubVehicleRepository } from '../interfaces';

export const PartsSubVehicleTypeormRepository = GarageDataSource.getRepository(
  Part,
).extend<IPartsSubVehicleRepository>({
  findMany(ids) {
    return this.find({ where: { id: In(ids) } });
  },
});
