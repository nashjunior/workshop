import { GarageDataSource } from '@database/sources';
import { Brand } from '@domains/vehicles/entites';
import { ILike, IsNull } from 'typeorm';
import { IBrandsRepository } from '../interfaces/IBrandsRepository';
import { v4 as uuidV4 } from 'uuid';

export const BrandsRepository = GarageDataSource.getRepository(
  Brand,
).extend<IBrandsRepository>({
  createOne(dto) {
    const instance = this.create({
      ...dto,
      id: uuidV4(),
    });
    return this.save(instance);
  },

  findByName(name) {
    console.log(name);

    return this.findOneBy({ name: ILike(name), deletedAt: IsNull() });
  },

  findByUUID(id) {
    return this.findOneOrFail({ where: { id } });
  },
});
