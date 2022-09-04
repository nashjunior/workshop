import { GarageDataSource } from '@database/sources';
import { Part } from '@domains/vehicles/entites';
import { IPartsRepository } from '../interfaces';
import { v4 as uuidV4 } from 'uuid';

export const PartsRepository = GarageDataSource.getRepository(
  Part,
).extend<IPartsRepository>({
  createOne(dto) {
    console.log(dto);

    const instance = this.create({ ...dto, id: uuidV4() });

    return this.save(instance);
  },
});
