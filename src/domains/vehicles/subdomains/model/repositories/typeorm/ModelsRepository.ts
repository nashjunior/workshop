import { GarageDataSource } from '@database/sources';
import { Model } from '@domains/vehicles/entites';
import { IModelsRepository } from '../interfaces';
import { v4 as uuidV4 } from 'uuid';

export const ModelsTypeormRepository = GarageDataSource.getRepository(
  Model,
).extend<IModelsRepository>({
  createOne(dto) {
    const instance = this.create({
      id: uuidV4(),
      ...dto,
    });
    return this.save(instance);
  },
});
