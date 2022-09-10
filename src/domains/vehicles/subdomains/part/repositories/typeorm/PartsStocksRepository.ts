import { GarageDataSource } from '@database/sources';
import { PartStock } from '@domains/vehicles/entites';
import { IPartsStocksRepository } from '../interfaces';
import { v4 as uuidV4 } from 'uuid';

export const PartsStocksTypeormRepository = GarageDataSource.getRepository(
  PartStock,
).extend<IPartsStocksRepository>({
  createOne(dto) {
    const instance = this.create({
      ...dto,
      id: uuidV4(),
    });

    return this.save(instance);
  },
});
