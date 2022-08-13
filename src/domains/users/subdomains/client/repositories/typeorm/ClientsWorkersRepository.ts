import { ClientWorker } from '@domains/users/entities';
import { GarageDataSource } from 'database/sources';
import { IClientsWorkersRepository } from '../interfaces';
import { v4 as uuidV4 } from 'uuid';

export const ClientsWorkersTypeormRepository = GarageDataSource.getRepository(
  ClientWorker,
).extend<IClientsWorkersRepository>({
  findWorkersByIdClient(id) {
    return this.find({ where: { idClient: id }, relations: ['worker'] });
  },

  createMany(dtos, idClient, _createdBy) {
    const instances = this.create(
      dtos.map(idWorker => ({
        id: uuidV4(),
        idClient,
        idWorker,
      })),
    );

    return this.save(instances);
  },
});
