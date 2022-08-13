import { Client } from '@domains/users/entities';
import { GarageDataSource } from 'database/sources';
import { IClientsRepository } from '../interfaces';

export const ClientsTypeormRepository = GarageDataSource.getRepository(
  Client,
).extend<IClientsRepository>({
  findById(id) {
    return this.findOneOrFail({ where: { id } });
  },
});
