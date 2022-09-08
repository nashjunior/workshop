import { GarageDataSource } from '@database/sources';

import { v4 as uuidV4 } from 'uuid';
import { IPartsPhotosRepository } from '../interfaces/IPartsPhotosRepository';
import { PartPhoto } from '@domains/vehicles/entites';

export const PartsPhotosRepository = GarageDataSource.getRepository(
  PartPhoto,
).extend<IPartsPhotosRepository>({
  createMany(dtos) {
    const instance = this.create(dtos.map(dto => ({ ...dto, id: uuidV4() })));

    return this.save(instance);
  },
});
